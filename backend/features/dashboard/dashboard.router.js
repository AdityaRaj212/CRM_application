import express from 'express';
import DashboardController from './dashboard.controller.js';

const router = express.Router();
const dashboardController = new DashboardController();

// Route to get dashboard data
router.get('/', (req, res) => dashboardController.getDashboardData(req, res));

// Route to update dashboard data
router.put('/', (req, res) => dashboardController.updateDashboard(req, res));

export default router;
