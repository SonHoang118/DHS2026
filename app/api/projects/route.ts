import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Project } from '@/models/Project';
import { Style } from '@/models/Style';
import { Category } from '@/models/Category';
import { normalizeImageRecords } from '@/utils/image';
import { createSlug } from '@/utils/slug';

async function buildUniqueSlug(name: string) {
  const base = createSlug(name);
  const seed = base || `project-${Date.now()}`;
  let slug = seed;
  let counter = 0;

  // Ensure slug uniqueness even when names are duplicated.
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const existing = await Project.findOne().where('slugify').equals(slug).lean();
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
    const q = searchParams.get("q") || "";
    const categories = searchParams.getAll("category").map((c) => c.trim()).filter(Boolean);
    const styles = searchParams.getAll("style").map((s) => s.trim()).filter(Boolean);

    const { getProjects } = await import("@/lib/services/projectService");
    const { items, total } = await getProjects(skip, limit, q, categories, styles);

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

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();

    const imgs = normalizeImageRecords(body?.imgs);

    const style = Array.isArray(body?.style)
      ? [...new Set(body.style
          .filter((item: unknown) => typeof item === 'string' && item.trim())
          .map((item: string) => item.trim()))]
      : [];

    const category = Array.isArray(body?.category)
      ? [...new Set(body.category
          .filter((item: unknown) => typeof item === 'string' && item.trim())
          .map((item: string) => item.trim()))]
      : [];

    const name = typeof body?.name === 'string' ? body.name.trim() : '';
    if (!name) {
      return NextResponse.json(
        { error: 'Missing field: name' },
        { status: 400 }
      );
    }

    if (imgs.length === 0) {
      return NextResponse.json(
        { error: 'At least one image is required' },
        { status: 400 }
      );
    }

    const payload = {
      imgs,
      name,
      investor: typeof body?.investor === 'string' ? body.investor.trim() : '',
      totalCost: typeof body?.totalCost === 'string' ? body.totalCost.trim() : '',
      location: typeof body?.location === 'string' ? body.location.trim() : '',
      date: typeof body?.date === 'string' ? body.date.trim() : '',
      decs: typeof body?.decs === 'string' ? body.decs.trim() : '',
      nFloors: typeof body?.nFloors === 'string' ? body.nFloors.trim() : '',
      style,
      category,
      area: typeof body?.area === 'string' ? body.area.trim() : '',
      slugify: await buildUniqueSlug(name),
    };

    const createdProject = await Project.create(payload);

    if (payload.style.length > 0) {
      await Style.updateMany(
        { name: { $in: payload.style } },
        { $addToSet: { id_projects_list: createdProject._id.toString() } }
      );
    }

    if (payload.category.length > 0) {
      await Category.updateMany(
        { name: { $in: payload.category } },
        { $addToSet: { id_projects_list: createdProject._id.toString() } }
      );
    }

    return NextResponse.json({ item: createdProject }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}