import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
    },
    author: String,
    image: String,
    tags: [String],
  },
  { timestamps: true }
);

export const Post = mongoose.models.Post || mongoose.model('Post', postSchema);
