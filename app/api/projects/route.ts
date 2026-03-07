import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Project } from '@/models/Project';
import { Style } from '@/models/Style';
import { Category } from '@/models/Category';

type ProjectImage = {
  link: string;
  id: string;
};

function normalizeImages(rawImages: unknown): ProjectImage[] {
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
    .filter((item): item is ProjectImage => Boolean(item));

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

async function buildUniqueSlug(name: string) {
  const base = createSlug(name);
  const seed = base || `project-${Date.now()}`;
  let slug = seed;
  let counter = 0;

  // Ensure slug uniqueness even when names are duplicated.
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const existing = await Project.findOne({ slugify: slug }).lean();
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

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();

    const imgs = normalizeImages(body?.imgs);

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