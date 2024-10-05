import express from 'express';
import TaskController from './task.controller.js';
import { upload } from './../../middlewares/fileUpload.middleware.js';  // Multer middleware

const taskController = new TaskController();
const router = express.Router();

router.post('/add', upload.single('file'), (req, res) => {
    taskController.addTask(req, res);
});

router.post('/add-checkpoints/:taskId', (req, res) => {
    taskController.addCheckpoints(req, res);
});

router.put('/update-checkpoint/:taskId', (req, res) => {
    taskController.updateCheckpoints(req, res);
});

router.post('/add-attachment/:taskId', upload.single('file'), (req, res) => {
    taskController.addAttachment(req, res);
});

router.get('/get-task-assigned-to-user/:userId', (req, res) => {
    taskController.getTasksAssignedToUser(req, res);
});

router.put('/update/:taskId', (req, res) => {
    taskController.updateTask(req, res);
});

router.delete('/delete/:taskId', (req, res) => {
    taskController.deleteTask(req, res);
});

export default router;
