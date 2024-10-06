import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskCard from '../components/TaskSection';
import ProgressBar from '../components/ProgressBar';
import Calendar from '../components/Calendar'; // Use the Calendar component
import styles from './styles/Dashboard.module.css';  // Import modular CSS
import TaskSection from '../components/TaskSection';
import GreetingHeader from '../components/GreetingHeader';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  const [userName, setUserName] = useState('User');
  const [userId, setUserId] = useState(null); // Set to null initially
  const [loading, setLoading] = useState(true); // Add a loading state

  // Fetch user details once the component is mounted
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
          const userResponse = await axios.get(`/api/users/get-user-by-id/${storedUserId}`);
          const user = userResponse.data.user;
          setUserName(user.name);
          setUserId(user._id);
        }
      } catch (err) {
        console.error('Error while fetching user details:', err);
      } finally {
        setLoading(false); // Once the fetch is complete, set loading to false
      }
    };
    fetchDetails();
  }, []);

  // Show loading spinner or placeholder while userId is being fetched
  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.dashboard}>
      <Sidebar /> {/* Sidebar can render immediately */}

      <div className={styles.content}>
        <header className={styles.header}>
          <GreetingHeader username={userName} />
          <h3 className={styles.thought}>
            "Success is the sum of small efforts, repeated day in and day out." - Robert Collier
          </h3>
        </header>

        <div className={styles.mainSection}>
          <div className={styles.calendarSection}>
            <Calendar userId={userId}/> {/* Calendar doesn't depend on userId */}
          </div>
          <div className={styles.rightSection}>
            <ProgressBar /> {/* Progress bar doesn't depend on userId */}
            <div className={styles.upcomingDeadlines}>
              <h4>Upcoming Deadlines</h4>
              <ul>
                <li>Project 1 Deadline: 25th May 2022</li>
                <li>Project 2 Deadline: 1st June 2022</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Render TaskSection only after userId is fetched */}
        {userId && (
          <div className={styles.tasks}>
            <TaskSection userId={userId} /> {/* Pass userId to TaskSection */}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
