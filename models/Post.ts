import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    imgTitle: {},
    title: {},
    content: { type: String },
    imgsId: {},
    slugify: {}
  }, {
  timestamps: true
});

export const Post = mongoose.models.Post || mongoose.model('Post', postSchema);
