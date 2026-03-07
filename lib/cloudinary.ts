import crypto from 'crypto';

export function getCloudinaryConfig() {
  return {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
    apiKey: process.env.CLOUDINARY_API_KEY || '',
    apiSecret: process.env.CLOUDINARY_API_SECRET || '',
    uploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET || '',
  };
}

export function createCloudinarySignature(params: Record<string, string>, apiSecret: string) {
  const sorted = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join('&');

  return crypto.createHash('sha1').update(`${sorted}${apiSecret}`).digest('hex');
}

export function isCloudinaryReady() {
  const { cloudName, apiKey, apiSecret } = getCloudinaryConfig();
  return Boolean(cloudName && apiKey && apiSecret);
}

export async function deleteCloudinaryImage(publicId: string) {
  const trimmedPublicId = publicId.trim();
  if (!trimmedPublicId || !isCloudinaryReady()) {
    return;
  }

  const { cloudName, apiKey, apiSecret } = getCloudinaryConfig();
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const signature = createCloudinarySignature(
    {
      public_id: trimmedPublicId,
      timestamp,
    },
    apiSecret
  );

  const payload = new URLSearchParams();
  payload.append('public_id', trimmedPublicId);
  payload.append('timestamp', timestamp);
  payload.append('api_key', apiKey);
  payload.append('signature', signature);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: payload.toString(),
    }
  );

  if (!response.ok) {
    const result = await response.text();
    throw new Error(result || `Failed to delete Cloudinary image ${trimmedPublicId}`);
  }
}
