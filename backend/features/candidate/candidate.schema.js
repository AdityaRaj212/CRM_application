import mongoose from "mongoose";

const CandidateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    status: { type: String, enum: ['Applied', 'Interviewed', 'Hired', 'Rejected'], default: 'Applied' },
    source: { type: String, required: true }, 
    appliedDate: { type: Date, default: Date.now },
});

export const CandidateModel = mongoose.model('Candidate', CandidateSchema);
