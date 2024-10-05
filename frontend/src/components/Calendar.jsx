import React, { useState, useEffect } from 'react';
import styles from './styles/Calendar.module.css';
import { format, addMonths, subMonths, startOfMonth, getDay, endOfMonth, isSameDay } from 'date-fns';
import axios from 'axios';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [attendance, setAttendance] = useState([]);

  // Function to handle month navigation
  const handleNextMonth = () => {
    setSelectedDate(addMonths(selectedDate, 1));
  };

  const handlePrevMonth = () => {
    setSelectedDate(subMonths(selectedDate, 1));
  };

  // Function to mark attendance for the selected date
  const markAttendance = (date) => {
    axios.post('/api/attendance', { userId: '123', date })
      .then(() => {
        setAttendance([...attendance, date]);
      })
      .catch(err => console.log(err));
  };

  // Fetch attendance on component mount
  useEffect(() => {
    axios.get('/api/attendance/123')
      .then(response => {
        setAttendance(response.data.attendedDates);
      })
      .catch(err => console.log(err));
  }, []);

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

      daysArray.push(
        <button
          key={i}
          className={`${styles.day} ${isAttended ? styles.attended : ''} ${isToday ? styles.today : ''}`}
          onClick={() => markAttendance(formattedDay)}
        >
          {i}
        </button>
      );
    }

    return daysArray;
  };

  return (
    <div className={styles.calendar}>
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

      <button className={styles.attendanceButton}>
        Mark Your Attendance
      </button>
    </div>
  );
};

export default Calendar;
