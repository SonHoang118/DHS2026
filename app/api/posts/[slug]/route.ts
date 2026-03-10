import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import { Post } from "@/models/Post";
import { deleteCloudinaryImage } from "@/lib/cloudinary";
import { normalizeImageRecords } from "@/utils/image";
import { createSlug } from "@/utils/slug";

function normalizeContent(rawContent: unknown) {
  if (typeof rawContent === "string") {
    return rawContent.trim();
  }

  if (rawContent && typeof rawContent === "object") {
    try {
      return JSON.stringify(rawContent);
    } catch {
      return "";
    }
  }

  return "";
}

function extractCloudinaryPublicId(imageUrl: string) {
  const trimmed = imageUrl.trim();
  if (!trimmed.includes('/upload/')) {
    return '';
  }

  const afterUpload = trimmed.split('/upload/')[1]?.split('?')[0] || '';
  if (!afterUpload) {
    return '';
  }

  const segments = afterUpload.split('/').filter(Boolean);
  const versionIndex = segments.findIndex((segment) => /^v\d+$/.test(segment));
  const idSegments = versionIndex >= 0 ? segments.slice(versionIndex + 1) : segments;
  const fullPath = idSegments.join('/');
  return fullPath.replace(/\.[^.]+$/, '');
}

function extractContentImageUrls(rawContent: string) {
  if (!rawContent.trim()) {
    return [] as string[];
  }

  try {
    const parsed = JSON.parse(rawContent) as {
      blocks?: Array<{ entityRanges?: Array<{ key?: number }> }>;
      entityMap?: Record<string, { type?: string; data?: { src?: string } }>;
    };

    const usedEntityKeys = new Set<string>();
    (parsed?.blocks || []).forEach((block) => {
      (block?.entityRanges || []).forEach((range) => {
        const key = typeof range?.key === 'number' ? String(range.key) : '';
        if (key) {
          usedEntityKeys.add(key);
        }
      });
    });

    const entityMap = parsed?.entityMap || {};
    return Array.from(usedEntityKeys)
      .map((key) => entityMap[key])
      .filter((entity) => entity?.type === 'IMAGE')
      .map((entity) => (typeof entity?.data?.src === 'string' ? entity.data.src.trim() : ''))
      .filter(Boolean);
  } catch {
    return [];
  }
}

function collectPostCloudinaryIds(params: {
  imgTitle: string;
  imgsId: Array<{ link: string; id: string }>;
  content: string;
}) {
  const ids = new Set<string>();

  if (params.imgTitle) {
    const titleId = extractCloudinaryPublicId(params.imgTitle);
    if (titleId) {
      ids.add(titleId);
    }
  }

  params.imgsId.forEach((image) => {
    if (image.id) {
      ids.add(image.id);
      return;
    }

    const idFromLink = extractCloudinaryPublicId(image.link);
    if (idFromLink) {
      ids.add(idFromLink);
    }
  });

  extractContentImageUrls(params.content).forEach((url) => {
    const contentId = extractCloudinaryPublicId(url);
    if (contentId) {
      ids.add(contentId);
    }
  });

  return ids;
}

async function buildUniqueSlug(title: string, postId: string) {
  const base = createSlug(title);
  const seed = base || `post-${Date.now()}`;
  let slug = seed;
  let counter = 0;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const existing = await Post.findOne().where('slugify').equals(slug).lean();
    if (!existing || String(existing._id) === postId) {
      return slug;
    }

    counter += 1;
    slug = `${seed}-${counter}`;
  }
}

async function findPostByIdentifier(identifier: string) {
  const trimmed = identifier.trim();
  if (!trimmed) {
    return null;
  }

  let post = await Post.findOne().where('slugify').equals(trimmed);
  if (!post && mongoose.Types.ObjectId.isValid(trimmed)) {
    post = await Post.findOne().where('_id').equals(trimmed);
  }

  return post;
}

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    const { getPostBySlug } = await import("@/lib/services/postService");
    const post = await getPostBySlug(slug);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB();
    const { slug } = await context.params;
    const post = await findPostByIdentifier(slug);

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const body = await request.json();
    const title = typeof body?.title === 'string' ? body.title.trim() : '';
    const imgTitle = typeof body?.imgTitle === 'string' ? body.imgTitle.trim() : '';
    const content = normalizeContent(body?.content);
    const imgsId = normalizeImageRecords(body?.imgsId);

    if (!title) {
      return NextResponse.json({ error: 'Missing field: title' }, { status: 400 });
    }

    if (!imgTitle) {
      return NextResponse.json({ error: 'Missing field: imgTitle' }, { status: 400 });
    }

    const previousImageIds = collectPostCloudinaryIds({
      imgTitle: String(post.imgTitle || ''),
      imgsId: normalizeImageRecords(post.imgsId),
      content: String(post.content || ''),
    });

    const nextImageIds = collectPostCloudinaryIds({
      imgTitle,
      imgsId,
      content,
    });

    Object.assign(post, {
      imgTitle,
      title,
      content,
      imgsId,
      slugify:
        title === String(post.title || '').trim()
          ? String(post.slugify || '')
          : await buildUniqueSlug(title, post._id.toString()),
    });

    await post.save();

    const pendingDeleteIds = Array.from(previousImageIds).filter(
      (id) => !nextImageIds.has(id)
    );

    if (pendingDeleteIds.length > 0) {
      await Promise.allSettled(pendingDeleteIds.map((publicId) => deleteCloudinaryImage(publicId)));
    }

    return NextResponse.json({ item: post });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB();
    const { slug } = await context.params;
    const post = await findPostByIdentifier(slug);

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const allImageIds = Array.from(
      collectPostCloudinaryIds({
        imgTitle: String(post.imgTitle || ''),
        imgsId: normalizeImageRecords(post.imgsId),
        content: String(post.content || ''),
      })
    );

    await Post.deleteOne().where('_id').equals(post._id);

    if (allImageIds.length > 0) {
      await Promise.allSettled(allImageIds.map((publicId) => deleteCloudinaryImage(publicId)));
    }

    return NextResponse.json({ message: 'Post deleted' });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    );
  }
}
