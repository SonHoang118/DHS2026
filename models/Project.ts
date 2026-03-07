import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    imgs: {
      type: [
        {
          link: { type: String, default: '' },
          id: { type: String, default: '' },
        },
      ],
      default: [],
    },
    name: { type: String, default: '' },
    investor: { type: String, default: '' },
    totalCost: { type: String, default: '' },
    location: { type: String, default: '' },
    date: { type: String, default: '' },
    decs: { type: String, default: '' },
    nFloors: { type: String, default: '' },
    style: { type: [String], default: [] },
    category: { type: [String], default: [] },
    area: { type: String, default: '' },
    slugify: { type: String, default: '' }
  }, {
  timestamps: true
});

const existingProjectModel = mongoose.models.Project as mongoose.Model<any> | undefined;

// Rebuild model when hot reload keeps an outdated schema (e.g., before category was added).
if (
  existingProjectModel &&
  (!existingProjectModel.schema.path('category') || !existingProjectModel.schema.path('imgs.id'))
) {
  mongoose.deleteModel('Project');
}

export const Project =
  (mongoose.models.Project as mongoose.Model<any> | undefined) ||
  mongoose.model('Project', projectSchema);
