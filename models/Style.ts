import mongoose from 'mongoose';

const styleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    id_projects_list: { type: Array },
})



export const Style = mongoose.models.Style || mongoose.model('Style', styleSchema);