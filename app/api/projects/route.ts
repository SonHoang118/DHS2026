import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const skip = parseInt(searchParams.get("skip") || "0", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const q = searchParams.get("q") || "";

    const { getProjects } = await import("@/lib/services/projectService");
    const { items, total } = await getProjects(skip, limit, q);

    return NextResponse.json({
      items,
      total
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}