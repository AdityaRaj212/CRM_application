import express from 'express';
import AttendanceController from './attendance.controller.js';

const router = express.Router();
const attendanceController = new AttendanceController();

router.post('/', (req, res)=>attendanceController.markAttendance(req, res));
router.get('/:userId', (req, res)=>attendanceController.getAttendance(req, res));

export default router;
