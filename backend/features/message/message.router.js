import express from 'express';
import MessageController from './message.controller.js';

const messageController = new MessageController();
const router = express.Router();

// Add a message
router.post('/add', (req, res) => messageController.addMessage(req, res));

// Get messages between two users
router.get('/between/:user1/:user2', (req, res) => messageController.getMessagesBetweenUsers(req, res));

// Update read status of a message
router.put('/read-status/:messageId', (req, res) => messageController.updateMessageReadStatus(req, res));

// Delete a message
router.delete('/delete/:messageId', (req, res) => messageController.deleteMessage(req, res));

export default router;
