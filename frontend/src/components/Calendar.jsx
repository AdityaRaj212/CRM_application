import React, { useState, useEffect } from 'react';
import styles from './styles/Calendar.module.css';
import { format, addMonths, subMonths, startOfMonth, getDay, endOfMonth, isSameDay, isToday } from 'date-fns';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Calendar = ({ userId }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [attendance, setAttendance] = useState([]);

  // Function to handle month navigation
  const handleNextMonth = () => {
    setSelectedDate(addMonths(selectedDate, 1));
  };

  const handlePrevMonth = () => {
    setSelectedDate(subMonths(selectedDate, 1));
  };

  // Function to mark attendance for the current date
  const markAttendance = async () => {
    const today = format(new Date(), 'yyyy-MM-dd'); // Get today's date
    if (!attendance.includes(today)) { // Only mark if not already attended
      try {
        const response = await axios.post('/api/attendance/', { userId, date: today });
        setAttendance((prev) => [...prev, response.data.date]); // Update attendance with the new date
        toast.success('Attendance marked successfully');
      } catch (err) {
        toast.error('Unable to mark attendance. Please try again later');
        console.log(err);
      }
    } else {
      // alert("Attendance for today is already marked.");
      toast.warning("Attendance for today is already marked.");
    }
  };

  // Fetch attendance on component mount
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await axios.get(`/api/attendance/${userId}`);
        setAttendance(response.data.attendedDates);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAttendance();
  }, [userId]);

  const renderDays = () => {
    const start = startOfMonth(selectedDate);
    const end = endOfMonth(selectedDate);
    const startDay = getDay(start); // Determines the day of the week (0: Sunday, 1: Monday, ..., 6: Saturday)

    const daysInMonth = end.getDate();
    const daysArray = [];

    // Padding for the days before the 1st of the month
    for (let i = 0; i < startDay; i++) {
      daysArray.push(<div key={`pad-${i}`} className={styles.emptyDay}></div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const day = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i);
      const formattedDay = format(day, 'yyyy-MM-dd');
      const isAttended = attendance.includes(formattedDay);
      const isToday = isSameDay(day, new Date());

      // Add classes for visual differentiation
      let dayClass = styles.day;
      if (isAttended) {
        dayClass += ` ${styles.attended}`; // Class for attended days
      } else if (!isAttended && isToday) {
        dayClass += ` ${styles.today}`; // Class for today
      } else {
        dayClass += ` ${styles.default}`; // Class for default days
      }

      daysArray.push(
        <div key={i} className={dayClass}>
          {i}
        </div>
      );
    }

    return daysArray;
  };

  return (
    <div className={styles.calendar}>
      <ToastContainer /> {/* Toast container for notifications */}
      <div className={styles.header}>
        <button className={styles.navButton} onClick={handlePrevMonth}>&lt;</button>
        <div className={styles.currentMonth}>
          {format(selectedDate, 'MMMM yyyy')}
        </div>
        <button className={styles.navButton} onClick={handleNextMonth}>&gt;</button>
      </div>

      <div className={styles.days}>
        <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
      </div>

      <div className={styles.dateGrid}>
        {renderDays()}
      </div>

      {/* Mark Attendance Button */}
      <button className={styles.attendanceButton} onClick={markAttendance}>
        Mark Attendance for Today
      </button>
    </div>
  );
};

export default Calendar;
