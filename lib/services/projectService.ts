import { Project } from "@/models/Project";
import { connectDB } from "@/lib/mongodb";

export async function getProjects(skip: number = 0, limit: number = 10) {
  await connectDB();

  const [projects, total] = await Promise.all([
    Project.find({}).skip(skip).limit(limit).lean(),
    Project.countDocuments()
  ]);

  return {
    items: projects,
    total
  };
}