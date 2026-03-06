import { Project } from "@/models/Project";
import { connectDB } from "@/lib/mongodb";

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