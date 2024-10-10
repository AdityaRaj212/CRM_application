import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    filename: { type: String, required: true },
    uploadDate: { type: Date, default: Date.now },
    filePath: { type: String, required: true },
    fileType: { type: String, required: true },
    description: { type: String, required: true }, // New description field
});

export const documentModel = mongoose.model('Document', documentSchema);
