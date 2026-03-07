import { NextRequest, NextResponse } from 'next/server';
import { createCloudinarySignature, getCloudinaryConfig, isCloudinaryReady } from '@/lib/cloudinary';

export async function POST(request: NextRequest) {
  try {
    if (!isCloudinaryReady()) {
      return NextResponse.json(
        {
          error:
            'Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET.',
        },
        { status: 500 }
      );
    }

    const form = await request.formData();
    const files = form.getAll('files').filter((file) => file instanceof File) as File[];

    if (files.length === 0) {
      return NextResponse.json({ error: 'No files uploaded' }, { status: 400 });
    }

    const { cloudName, apiKey, apiSecret, uploadPreset } = getCloudinaryConfig();
    const uploadedImages: Array<{ link: string; id: string }> = [];

    for (const file of files) {
      const timestamp = Math.floor(Date.now() / 1000).toString();
      const paramsToSign: Record<string, string> = {
        timestamp,
      };

      if (uploadPreset) {
        paramsToSign.upload_preset = uploadPreset;
      }

      const signature = createCloudinarySignature(paramsToSign, apiSecret);
      const payload = new FormData();
      payload.append('file', file);
      payload.append('api_key', apiKey);
      payload.append('timestamp', timestamp);
      payload.append('signature', signature);

      if (uploadPreset) {
        payload.append('upload_preset', uploadPreset);
      }

      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: 'POST',
          body: payload,
        }
      );

      const uploadResult = await uploadResponse.json();
      if (!uploadResponse.ok) {
        return NextResponse.json(
          { error: uploadResult?.error?.message || 'Failed to upload image' },
          { status: 500 }
        );
      }

      if (typeof uploadResult?.secure_url === 'string') {
        uploadedImages.push({
          link: uploadResult.secure_url,
          id: typeof uploadResult?.public_id === 'string' ? uploadResult.public_id : '',
        });
      }
    }

    return NextResponse.json({
      images: uploadedImages,
      urls: uploadedImages.map((item) => item.link),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
