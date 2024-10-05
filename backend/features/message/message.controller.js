import MessageRepository from "./message.repository.js";

export default class MessageController {
    constructor() {
        this.messageRepository = new MessageRepository();
    }

    // Add a new message
    async addMessage(req, res) {
        try {
            const { from, to, content } = req.body;
            const newMessage = await this.messageRepository.addMessage(from, to, content);
            return res.status(201).json({
                status: true,
                message: newMessage
            });
        } catch (err) {
            console.error('Error while creating message: ', err);
            return res.status(500).json({ message: 'Error creating message', error: err.message });
        }
    }

    // Get all messages between two users
    async getMessagesBetweenUsers(req, res) {
        try {
            const { user1, user2 } = req.params;
            const messages = await this.messageRepository.getMessagesBetweenUsers(user1, user2);
            return res.status(200).json({
                status: true,
                messages
            });
        } catch (err) {
            console.error('Error while fetching messages: ', err);
            return res.status(500).json({ message: 'Error fetching messages', error: err.message });
        }
    }

    // Update the read status of a message
    async updateMessageReadStatus(req, res) {
        try {
            const { messageId } = req.params;
            const { readStatus } = req.body;
            const updatedMessage = await this.messageRepository.updateMessageReadStatus(messageId, readStatus);
            return res.status(200).json({
                status: true,
                message: updatedMessage
            });
        } catch (err) {
            console.error('Error while updating message: ', err);
            return res.status(500).json({ message: 'Error updating message', error: err.message });
        }
    }

    // Delete a message
    async deleteMessage(req, res) {
        try {
            const { messageId } = req.params;
            const deletedMessage = await this.messageRepository.deleteMessage(messageId);
            return res.status(200).json({
                status: true,
                message: 'Message deleted successfully',
                deletedMessage
            });
        } catch (err) {
            console.error('Error while deleting message: ', err);
            return res.status(500).json({ message: 'Error deleting message', error: err.message });
        }
    }
}
