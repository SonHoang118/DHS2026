import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    phone: String,
  },
  { timestamps: true }
);

export const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);
