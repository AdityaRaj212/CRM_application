import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    dueDate: { type: Date },
    status: { type: String, enum: ['To-Do', 'In-progress', 'Completed'] },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
    attachments: [{ type: String }],

    // Checkpoints for each task
    checkpoints: [
        {
            description: { type: String, required: true },
            completed: { type: Boolean, default: false },
        }
    ]
});

export const TaskModel = mongoose.model('Task', TaskSchema);
