import {AttendanceModel as Attendance} from './attendance.schema.js';

export default class AttendanceRepository {
  async addAttendance(userId, date) {
    const attendanceRecord = await Attendance.findOne({ userId });
    if (attendanceRecord) {
      if (!attendanceRecord.attendedDates.includes(date)) {
        attendanceRecord.attendedDates.push(date);
        await attendanceRecord.save();
        return { date };
      }
    } else {
      const newRecord = new Attendance({ userId, attendedDates: [date] });
      await newRecord.save();
      return { date };
    }
    throw new Error('Attendance already marked for this date');
  }

  async getAttendance(userId) {
    const attendanceRecord = await Attendance.findOne({ userId });
    return attendanceRecord || { attendedDates: [] }; // Return an empty array if not found
  }
}

