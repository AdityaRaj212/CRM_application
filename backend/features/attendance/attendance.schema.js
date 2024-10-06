import mongoose from 'mongoose';

const AttendanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  attendedDates: [{ type: String, required: true }] // Store dates as strings (YYYY-MM-DD)
});

export const AttendanceModel =  mongoose.model('Attendance', AttendanceSchema);
