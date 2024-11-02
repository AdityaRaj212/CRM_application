import React, { useState, useEffect } from 'react';
import styles from './styles/Calendar.module.css';
import { format, addMonths, subMonths, startOfMonth, getDay, endOfMonth, isSameDay, isWeekend, eachDayOfInterval } from 'date-fns';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Calendar = ({ userId, joiningDate }) => {
  const apiUrl = process.env.REACT_APP_API_BASE_URL;

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [attendance, setAttendance] = useState([]);

  const handleNextMonth = () => {
    setSelectedDate(addMonths(selectedDate, 1));
  };

  const handlePrevMonth = () => {
    setSelectedDate(subMonths(selectedDate, 1));
  };

  const markAttendance = async () => {
    const today = format(new Date(), 'yyyy-MM-dd');
    if (!attendance.includes(today)) {
      try {
        const response = await axios.post('/api/attendance/', { userId, date: today });
        setAttendance((prev) => [...prev, response.data.date]);
        toast.success('Attendance marked successfully');
      } catch (err) {
        toast.error('Unable to mark attendance. Please try again later');
      }
    } else {
      toast.warning("Attendance for today is already marked.");
    }
  };

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await axios.get(`/api/attendance/${userId}`);
        setAttendance(response.data.attendedDates);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAttendance();
  }, [userId]);

  const renderDays = () => {
    const start = startOfMonth(selectedDate);
    const end = endOfMonth(selectedDate);
    const startDay = getDay(start);
    const daysInMonth = end.getDate();
    const daysArray = [];

    const today = new Date();
    const daysSinceJoining = eachDayOfInterval({
      start: new Date(joiningDate),
      end: today,
    });

    // Padding for the days before the 1st of the month
    for (let i = 0; i < startDay; i++) {
      daysArray.push(<div key={`pad-${i}`} className={styles.emptyDay}></div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const day = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i);
      const formattedDay = format(day, 'yyyy-MM-dd');
      const isAttended = attendance.includes(formattedDay);
      const isToday = isSameDay(day, new Date());
      const isJoiningDayOrAfter = daysSinceJoining.some(joiningDay => isSameDay(joiningDay, day));

      let dayClass = styles.default; 
      if (isAttended) {
        dayClass = styles.attended; 
      } else if (isJoiningDayOrAfter && !isAttended && !isWeekend(day)) {
        dayClass = styles.absent; 
      }
      
      daysArray.push(
        <div key={i} className={`${styles.day} ${dayClass} ${isToday ? styles.today : ''}`}>
          {i}
        </div>
      );
    }

    return daysArray;
  };

  return (
    <div className={styles.calendar}>
      <ToastContainer />
      <div className={styles.header}>
        <button className={styles.navButton} onClick={handlePrevMonth}>&lt;</button>
        <div className={styles.currentMonth}>
          {format(selectedDate, 'MMMM yyyy')}
        </div>
        <button className={styles.navButton} onClick={handleNextMonth}>&gt;</button>
      </div>

      <div className={styles.days}>
        <span className={styles.dayName}>SUN</span>
        <span className={styles.dayName}>MON</span>
        <span className={styles.dayName}>TUE</span>
        <span className={styles.dayName}>WED</span>
        <span className={styles.dayName}>THU</span>
        <span className={styles.dayName}>FRI</span>
        <span className={styles.dayName}>SAT</span>
      </div>

      <div className={styles.dateGrid}>
        {renderDays()}
      </div>

      <div className={styles.attendance}>
        <button onClick={markAttendance} className={styles.attendanceButton}>
          Mark Attendance for Today
        </button>
      </div>
    </div>
  );
};

export default Calendar;


// import React, { useState, useEffect } from 'react';
// import styles from './styles/Calendar.module.css';
// import { format, addMonths, subMonths, startOfMonth, getDay, endOfMonth, isSameDay, isWeekend, eachDayOfInterval } from 'date-fns';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import axios from 'axios';

// const Calendar = ({ userId, joiningDate }) => {
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [attendance, setAttendance] = useState([]);

//   // Function to handle month navigation
//   const handleNextMonth = () => {
//     setSelectedDate(addMonths(selectedDate, 1));
//   };

//   const handlePrevMonth = () => {
//     setSelectedDate(subMonths(selectedDate, 1));
//   };

//   // Function to mark attendance for the current date
//   const markAttendance = async () => {
//     const today = format(new Date(), 'yyyy-MM-dd'); // Get today's date
//     if (!attendance.includes(today)) { // Only mark if not already attended
//       try {
//         const response = await axios.post('/api/attendance/', { userId, date: today });
//         setAttendance((prev) => [...prev, response.data.date]); // Update attendance with the new date
//         toast.success('Attendance marked successfully');
//       } catch (err) {
//         toast.error('Unable to mark attendance. Please try again later');
//         console.log(err);
//       }
//     } else {
//       // alert("Attendance for today is already marked.");
//       toast.warning("Attendance for today is already marked.");
//     }
//   };

//   // Fetch attendance on component mount
//   useEffect(() => {
//     const fetchAttendance = async () => {
//       try {
//         const response = await axios.get(`/api/attendance/${userId}`);
//         setAttendance(response.data.attendedDates);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchAttendance();
//   }, [userId]);

//   const renderDays = () => {
//     const start = startOfMonth(selectedDate);
//     const end = endOfMonth(selectedDate);
//     const startDay = getDay(start);

//     const daysInMonth = end.getDate();
//     const daysArray = [];

//     // Calculate all days from joining date to today
//     const today = new Date();
//     const daysSinceJoining = eachDayOfInterval({
//       start: new Date(joiningDate),
//       end: today,
//     });

//     // Padding for the days before the 1st of the month
//     for (let i = 0; i < startDay; i++) {
//       daysArray.push(<div key={`pad-${i}`} className={styles.emptyDay}></div>);
//     }

//     for (let i = 1; i <= daysInMonth; i++) {
//       const day = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i);
//       const formattedDay = format(day, 'yyyy-MM-dd');
//       const isAttended = attendance.includes(formattedDay);
//       const isToday = isSameDay(day, new Date());
//       const isJoiningDayOrAfter = daysSinceJoining.some(joiningDay => isSameDay(joiningDay, day));

//       // Determine the class for the day based on attendance and joining date
//       let dayClass = styles.default; // Default class
//       if (isAttended) {
//         dayClass = styles.attended; // Mark as attended
//       } else if (isJoiningDayOrAfter && !isAttended && !isWeekend(day)) {
//         dayClass = styles.absent; // Mark as absent (non-weekend days)
//       }

//       daysArray.push(
//         <div key={i} className={`${styles.day} ${dayClass}`}>
//           {i}
//         </div>
//       );
//     }

//     return daysArray;
//   };

//   return (
//     <div className={styles.calendar}>
//       <ToastContainer/>
//       <div className={styles.header}>
//         <button className={styles.navButton} onClick={handlePrevMonth}>&lt;</button>
//         <div className={styles.currentMonth}>
//           {format(selectedDate, 'MMMM yyyy')}
//         </div>
//         <button className={styles.navButton} onClick={handleNextMonth}>&gt;</button>
//       </div>

//       <div className={styles.days}>
//         <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
//       </div>

//       <div className={styles.dateGrid}>
//         {renderDays()}
//       </div>

//       {/* Mark Attendance Button */}
//       <button onClick={markAttendance} className={styles.attendanceButton}>
//         Mark Attendance for Today
//       </button>
//     </div>
//   );
// };

// export default Calendar;
