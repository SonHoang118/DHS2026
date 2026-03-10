import { Project } from "@/models/Project";
import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";

export async function getProjects(skip: number = 0, limit: number = 10, keyword: string = "") {
  await connectDB();

  const trimmedKeyword = keyword.trim();
  const searchConditions = [
    { name: { $regex: trimmedKeyword, $options: "i" } },
    { investor: { $regex: trimmedKeyword, $options: "i" } },
    { location: { $regex: trimmedKeyword, $options: "i" } },
    { decs: { $regex: trimmedKeyword, $options: "i" } },
    { style: { $regex: trimmedKeyword, $options: "i" } },
    { category: { $regex: trimmedKeyword, $options: "i" } },
  ];

  const projectsQuery = trimmedKeyword
    ? Project.find().or(searchConditions)
    : Project.find();

  const totalQuery = trimmedKeyword
    ? Project.find().or(searchConditions).countDocuments()
    : Project.countDocuments();

  const [projects, total] = await Promise.all([
    projectsQuery.sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    totalQuery,
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

  let project = await Project.findOne().where('slugify').equals(trimmedSlug).lean();

  // Backward-compatible fallback in case old records do not have slugify.
  if (!project && mongoose.Types.ObjectId.isValid(trimmedSlug)) {
    project = await Project.findOne().where('_id').equals(trimmedSlug).lean();
  }

  return project;
}