import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    imgTitle: { type: String, default: '' },
    title: { type: String, default: '' },
    content: { type: String, default: '' },
    imgsId: {
      type: [
        {
          link: { type: String, default: '' },
          id: { type: String, default: '' },
        },
      ],
      default: [],
    },
    slugify: { type: String, default: '' }
  }, {
  timestamps: true
});

const existingPostModel = mongoose.models.Post as mongoose.Model<any> | undefined;

if (existingPostModel && !existingPostModel.schema.path('imgsId.id')) {
  mongoose.deleteModel('Post');
}

export const Post =
  (mongoose.models.Post as mongoose.Model<any> | undefined) ||
  mongoose.model('Post', postSchema);
