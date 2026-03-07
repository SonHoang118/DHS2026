// import { NextRequest, NextResponse } from 'next/server';

// export async function GET(request: NextRequest) {
//   try {
//     // TODO: Fetch posts from database
//     return NextResponse.json({ message: 'Get posts' });
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
//   }
// }

// export async function POST(request: NextRequest) {
//   try {
//     // TODO: Create a new post
//     return NextResponse.json({ message: 'Post created' }, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
//   }
// }

import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Post } from '@/models/Post';

type PostImage = {
  link: string;
  id: string;
};

function createSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function normalizeImages(rawImages: unknown): PostImage[] {
  if (!Array.isArray(rawImages)) {
    return [];
  }

  const normalized = rawImages
    .map((item) => {
      if (typeof item === 'string') {
        const link = item.trim();
        return link ? { link, id: '' } : null;
      }

      if (item && typeof item === 'object') {
        const link =
          typeof (item as Record<string, unknown>).link === 'string'
            ? (item as Record<string, string>).link.trim()
            : '';
        const id =
          typeof (item as Record<string, unknown>).id === 'string'
            ? (item as Record<string, string>).id.trim()
            : '';

        if (!link) {
          return null;
        }

        return { link, id };
      }

      return null;
    })
    .filter((item): item is PostImage => Boolean(item));

  const seen = new Set<string>();
  return normalized.filter((image) => {
    const key = image.id || image.link;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

function normalizeContent(rawContent: unknown) {
  if (typeof rawContent === 'string') {
    return rawContent.trim();
  }

  if (rawContent && typeof rawContent === 'object') {
    try {
      return JSON.stringify(rawContent);
    } catch {
      return '';
    }
  }

  return '';
}

async function buildUniqueSlug(title: string) {
  const base = createSlug(title);
  const seed = base || `post-${Date.now()}`;
  let slug = seed;
  let counter = 0;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const existing = await Post.findOne({ slugify: slug }).lean();
    if (!existing) {
      return slug;
    }

    counter += 1;
    slug = `${seed}-${counter}`;
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const skip = parseInt(searchParams.get("skip") || "0", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    const { getPosts } = await import("@/lib/services/postService");
    const { items, total } = await getPosts(skip, limit);

    return NextResponse.json({
      items,
      total
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();

    const title = typeof body?.title === 'string' ? body.title.trim() : '';
    const imgTitle = typeof body?.imgTitle === 'string' ? body.imgTitle.trim() : '';
    const content = normalizeContent(body?.content);
    const imgsId = normalizeImages(body?.imgsId);

    if (!title) {
      return NextResponse.json({ error: 'Missing field: title' }, { status: 400 });
    }

    if (!imgTitle) {
      return NextResponse.json({ error: 'Missing field: imgTitle' }, { status: 400 });
    }

    const createdPost = await Post.create({
      imgTitle,
      title,
      content,
      imgsId,
      slugify: await buildUniqueSlug(title),
    });

    return NextResponse.json({ item: createdPost }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}