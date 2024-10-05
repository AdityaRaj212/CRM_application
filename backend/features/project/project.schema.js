import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    teamMembers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    tasks:  [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task'
        }
    ],
    status: {
        type: String,
        enum: ['To-Do', 'In-progress', 'Completed']
    }
});

export const ProjectModel = mongoose.model('Project', ProjectSchema);