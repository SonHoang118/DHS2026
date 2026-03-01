import mongoose from 'mongoose';

const webInfoSchema = new mongoose.Schema({
    totalViews: { type: Number, default: 0 },
    imgsBanner: {}
});


export const WebsiteInfo = mongoose.models.WebsiteInfo || mongoose.model('WebsiteInfo', webInfoSchema);