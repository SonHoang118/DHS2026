import { Post } from "@/models/Post";
import { connectDB } from "@/lib/mongodb";

export async function getPosts(skip: number = 0, limit: number = 10) {
  await connectDB();

  const [posts, total] = await Promise.all([
    Post.find({}).skip(skip).limit(limit).lean(),
    Post.countDocuments()
  ]);

  return {
    items: posts,
    total
  };
}
