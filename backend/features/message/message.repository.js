import { MessageModel } from './message.schema.js';

export default class MessageRepository {

    // Create a new message
    async addMessage(from, to, content) {
        try {
            const newMessage = new MessageModel({
                from,
                to,
                content,
                readStatus: 'Unread'  // Default status is 'Unread'
            });
            await newMessage.save();
            return newMessage;
        } catch (err) {
            console.log('Error while creating message: ', err);
            throw new Error(err);
        }
    }

    // Get all messages between two users (from and to)
    async getMessagesBetweenUsers(user1, user2) {
        try {
            const messages = await MessageModel.find({
                $or: [
                    { from: user1, to: user2 },
                    { from: user2, to: user1 }
                ]
            }).populate('from', 'name email').populate('to', 'name email');
            return messages;
        } catch (err) {
            console.log('Error while fetching messages: ', err);
            throw new Error(err);
        }
    }

    // Update message read status
    async updateMessageReadStatus(messageId, readStatus) {
        try {
            const updatedMessage = await MessageModel.findByIdAndUpdate(
                messageId,
                { $set: { readStatus } },
                { new: true }
            );
            if (!updatedMessage) {
                throw new Error(`Message with ID ${messageId} not found`);
            }
            return updatedMessage;
        } catch (err) {
            console.log('Error while updating message: ', err);
            throw new Error(err);
        }
    }

    // Delete a message
    async deleteMessage(messageId) {
        try {
            const deletedMessage = await MessageModel.findByIdAndDelete(messageId);
            if (!deletedMessage) {
                throw new Error(`Message with ID ${messageId} not found`);
            }
            return deletedMessage;
        } catch (err) {
            console.log('Error while deleting message: ', err);
            throw new Error(err);
        }
    }
}
