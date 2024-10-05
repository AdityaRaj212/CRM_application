import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String, 
        required: true
    },
    time: {
        type: Date,
        default: Date.now
    },
    readStatus: {
        type: String,
        enum: ['Read', 'Unread']
    }
});

export const MessageModel = mongoose.model('Message', MessageSchema);