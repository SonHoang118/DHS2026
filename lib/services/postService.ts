import { Post } from "@/models/Post";
import { connectDB } from "@/lib/mongodb";
import mongoose from "mongoose";

export async function getPosts(skip: number = 0, limit: number = 10) {
  await connectDB();

  const [posts, total] = await Promise.all([
    Post.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Post.countDocuments()
  ]);

  return {
    items: posts,
    total
  };
}

export async function getPostBySlug(slug: string) {
  await connectDB();

  const trimmedSlug = slug.trim();
  if (!trimmedSlug) {
    return null;
  }

  let post = await Post.findOne().where('slugify').equals(trimmedSlug).lean();

  // Backward-compatible fallback for data without slugify.
  if (!post && mongoose.Types.ObjectId.isValid(trimmedSlug)) {
    post = await Post.findOne().where('_id').equals(trimmedSlug).lean();
  }

  return post;
}
