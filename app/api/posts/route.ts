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