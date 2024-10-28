import mongoose from 'mongoose';

const VacancySchema = new mongoose.Schema({
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'User' 
    },
    status: { 
        type: String, 
        enum: ['open', 'closed'], 
        default: 'open' 
    },
    creationDate: { 
        type: Date, 
        default: Date.now 
    },
    deadline: { 
        type: Date, 
        required: true 
    },
    role: { 
        type: String, 
        required: true 
    },
    openings: { 
        type: Number, 
        required: true 
    },
    hired: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Candidate' 
    }],
    applicants: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Candidate' 
    }]
});

export const VacancyModel = mongoose.model('Vacancy', VacancySchema);
