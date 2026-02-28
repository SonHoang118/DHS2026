import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    slug: {
      type: String,
      unique: true,
      required: true,
    },
    image: String,
    technologies: [String],
    link: String,
  },
  { timestamps: true }
);

export const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);
