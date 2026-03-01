import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    imgs: {},
    name: {},
    investor: {},
    totalCost: {},
    location: {},
    date: {},
    decs: {},
    nFloors: {},
    style: {},
    area: {},
    slugify: {}
  }, {
  timestamps: true
});

export const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);
