import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  id_projects_list: { type: Array },
});

export const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);
