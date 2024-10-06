import AttendanceRepository from './attendance.repository.js';

export default class AttendanceController {
  constructor(){
    this.attendanceRepository = new AttendanceRepository();
  }
  async markAttendance(req, res) {
    try {
      const { userId, date } = req.body;
      const result = await this.attendanceRepository.addAttendance(userId, date);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  async getAttendance(req, res) {
    try {
      const { userId } = req.params;
      const result = await this.attendanceRepository.getAttendance(userId);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
}

