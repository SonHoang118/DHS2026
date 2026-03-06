import { Project } from "@/models/Project";
import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";

export async function getProjects(skip: number = 0, limit: number = 10, keyword: string = "") {
  await connectDB();

  const trimmedKeyword = keyword.trim();
  const query = trimmedKeyword
    ? {
        $or: [
          { name: { $regex: trimmedKeyword, $options: "i" } },
          { investor: { $regex: trimmedKeyword, $options: "i" } },
          { location: { $regex: trimmedKeyword, $options: "i" } },
          { decs: { $regex: trimmedKeyword, $options: "i" } },
          { style: { $regex: trimmedKeyword, $options: "i" } },
        ],
      }
    : {};

  const [projects, total] = await Promise.all([
    Project.find(query).skip(skip).limit(limit).lean(),
    Project.countDocuments(query)
  ]);

  return {
    items: projects,
    total
  };
}

export async function getProjectBySlug(slug: string) {
  await connectDB();

  const trimmedSlug = slug.trim();
  if (!trimmedSlug) {
    return null;
  }

  let project = await Project.findOne({ slugify: trimmedSlug }).lean();

  // Backward-compatible fallback in case old records do not have slugify.
  if (!project && mongoose.Types.ObjectId.isValid(trimmedSlug)) {
    project = await Project.findById(trimmedSlug).lean();
  }

  return project;
}