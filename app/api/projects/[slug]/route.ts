import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import { Project } from "@/models/Project";
import { Style } from "@/models/Style";
import { Category } from "@/models/Category";
import { deleteCloudinaryImage } from "@/lib/cloudinary";

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
      if (typeof item === "string") {
        const link = item.trim();
        return link ? { link, id: "" } : null;
      }

      if (item && typeof item === "object") {
        const link =
          typeof (item as Record<string, unknown>).link === "string"
            ? (item as Record<string, string>).link.trim()
            : "";
        const id =
          typeof (item as Record<string, unknown>).id === "string"
            ? (item as Record<string, string>).id.trim()
            : "";

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
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

async function buildUniqueSlug(name: string, projectId: string) {
  const base = createSlug(name);
  const seed = base || `project-${Date.now()}`;
  let slug = seed;
  let counter = 0;

  // Ensure slug uniqueness while allowing current project's own slug.
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const existing = await Project.findOne({ slugify: slug }).lean();
    if (!existing || String(existing._id) === projectId) {
      return slug;
    }
    counter += 1;
    slug = `${seed}-${counter}`;
  }
}

async function findProjectByIdentifier(identifier: string) {
  const trimmed = identifier.trim();
  if (!trimmed) {
    return null;
  }

  let project = await Project.findOne({ slugify: trimmed });
  if (!project && mongoose.Types.ObjectId.isValid(trimmed)) {
    project = await Project.findById(trimmed);
  }

  return project;
}

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    const { getProjectBySlug } = await import("@/lib/services/projectService");
    const project = await getProjectBySlug(slug);

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch project" },
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
    const project = await findProjectByIdentifier(slug);

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const body = await request.json();
    const imgs = normalizeImages(body?.imgs);

    const style = Array.isArray(body?.style)
      ? [...new Set(body.style
          .filter((item: unknown) => typeof item === "string" && item.trim())
          .map((item: string) => item.trim()))]
      : [];

    const category = Array.isArray(body?.category)
      ? [...new Set(body.category
          .filter((item: unknown) => typeof item === "string" && item.trim())
          .map((item: string) => item.trim()))]
      : [];

    const name = typeof body?.name === "string" ? body.name.trim() : "";
    if (!name) {
      return NextResponse.json(
        { error: "Missing field: name" },
        { status: 400 }
      );
    }

    if (imgs.length === 0) {
      return NextResponse.json(
        { error: "At least one image is required" },
        { status: 400 }
      );
    }

    const payload = {
      imgs,
      name,
      investor: typeof body?.investor === "string" ? body.investor.trim() : "",
      totalCost: typeof body?.totalCost === "string" ? body.totalCost.trim() : "",
      location: typeof body?.location === "string" ? body.location.trim() : "",
      date: typeof body?.date === "string" ? body.date.trim() : "",
      decs: typeof body?.decs === "string" ? body.decs.trim() : "",
      nFloors: typeof body?.nFloors === "string" ? body.nFloors.trim() : "",
      style,
      category,
      area: typeof body?.area === "string" ? body.area.trim() : "",
      slugify:
        name === String(project.name || "").trim()
          ? String(project.slugify || "")
          : await buildUniqueSlug(name, project._id.toString()),
    };

    const previousStyles = Array.isArray(project.style)
      ? project.style.map((item: unknown) => String(item || "")).filter(Boolean)
      : project.style
        ? [String(project.style)]
        : [];

    const previousImages = normalizeImages(project.imgs);
    const removedImageIds = previousImages
      .filter((prevImage) => !payload.imgs.some((nextImage) => {
        if (prevImage.id && nextImage.id) {
          return prevImage.id === nextImage.id;
        }
        return prevImage.link === nextImage.link;
      }))
      .map((image) => image.id)
      .filter(Boolean);

    const nextStyles = payload.style;
    const removedStyles = previousStyles.filter((name) => !nextStyles.includes(name));

    const previousCategories = Array.isArray(project.category)
      ? project.category.map((item: unknown) => String(item || "")).filter(Boolean)
      : project.category
        ? [String(project.category)]
        : [];

    const nextCategories = payload.category;
    const removedCategories = previousCategories.filter(
      (name) => !nextCategories.includes(name)
    );

    Object.assign(project, payload);
    await project.save();

    const projectId = project._id.toString();
    if (removedStyles.length > 0) {
      await Style.updateMany(
        { name: { $in: removedStyles } },
        { $pull: { id_projects_list: projectId } }
      );
    }

    await Style.updateMany(
      { name: { $in: nextStyles } },
      { $addToSet: { id_projects_list: projectId } }
    );

    if (removedCategories.length > 0) {
      await Category.updateMany(
        { name: { $in: removedCategories } },
        { $pull: { id_projects_list: projectId } }
      );
    }

    await Category.updateMany(
      { name: { $in: nextCategories } },
      { $addToSet: { id_projects_list: projectId } }
    );

    if (removedImageIds.length > 0) {
      await Promise.allSettled(removedImageIds.map((publicId) => deleteCloudinaryImage(publicId)));
    }

    return NextResponse.json({ item: project });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update project" },
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
    const project = await findProjectByIdentifier(slug);

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const projectId = project._id.toString();
    const styleNames = Array.isArray(project.style)
      ? project.style.map((item: unknown) => String(item || "")).filter(Boolean)
      : project.style
        ? [String(project.style)]
        : [];

    const categoryNames = Array.isArray(project.category)
      ? project.category.map((item: unknown) => String(item || "")).filter(Boolean)
      : project.category
        ? [String(project.category)]
        : [];

    const imageIds = normalizeImages(project.imgs)
      .map((image) => image.id)
      .filter(Boolean);

    await Project.deleteOne({ _id: project._id });

    if (styleNames.length > 0) {
      await Style.updateMany(
        { name: { $in: styleNames } },
        { $pull: { id_projects_list: projectId } }
      );
    }

    if (categoryNames.length > 0) {
      await Category.updateMany(
        { name: { $in: categoryNames } },
        { $pull: { id_projects_list: projectId } }
      );
    }

    if (imageIds.length > 0) {
      await Promise.allSettled(imageIds.map((publicId) => deleteCloudinaryImage(publicId)));
    }

    return NextResponse.json({ message: "Project deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
