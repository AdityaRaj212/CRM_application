import express from 'express';
import ProjectController from './project.controller.js';

const projectController = new ProjectController();
const router = express.Router();

// Add a project
router.post('/add', (req, res) => projectController.addProject(req, res));

// Get projects by user
router.get('/get-projects-by-user/:userId', (req, res) => projectController.getProjectsByUser(req, res));

// Update a project
router.put('/update/:projectId', (req, res) => projectController.updateProject(req, res));

// Delete a project
router.delete('/delete/:projectId', (req, res) => projectController.deleteProject(req, res));

export default router;
