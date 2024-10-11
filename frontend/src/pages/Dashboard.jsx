import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import TaskCard from '../components/TaskSection';
import ProgressBar from '../components/ProgressBar';
import Calendar from '../components/Calendar'; // Use the Calendar component
import styles from './styles/Dashboard.module.css';  // Import modular CSS
import TaskSection from '../components/TaskSection';
import GreetingHeader from '../components/GreetingHeader';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import LoginPage from './Login';
import Loading from '../components/Loading';
import { useNavigate } from 'react-router-dom';

const thoughtsList = [
  "Success is the sum of small efforts, repeated day in and day out. - Robert Collier",
  "Your limitation—it's only your imagination.",
  "Push yourself, because no one else is going to do it for you.",
  "Great things never come from comfort zones.",
  "Dream it. Wish it. Do it.",
  "Success doesn’t just find you. You have to go out and get it.",
  "The harder you work for something, the greater you’ll feel when you achieve it.",
  "Dream bigger. Do bigger.",
  "Don’t stop when you’re tired. Stop when you’re done.",
  "Wake up with determination. Go to bed with satisfaction."
];

const Dashboard = () => {
  const {user, login, logout, loading} = useAuth();
  const navigate = useNavigate();
  const [userName, setUserName] = useState('User');
  const [joiningDate, setJoiningDate] = useState(null);
  const [userId, setUserId] = useState(null); // Set to null initially
  // const [loading, setLoading] = useState(true);
  const [thought, setThought] = useState(''); // State for dynamic thought

  // Fetch user details once the component is mounted
  // useEffect(() => {
  //   const fetchDetails = async () => {
  //     try {
  //       const storedUserId = localStorage.getItem('userId');
  //       if (storedUserId) {
  //         const userResponse = await axios.get(`/api/users/get-user-by-id/${storedUserId}`);
  //         // const user = userResponse.data.user;
  //         setUserName(user.firstName);
  //         setUserId(user._id);
  //         setJoiningDate(user.joiningDate);
  //       }
  //     } catch (err) {
  //       console.error('Error while fetching user details:', err);
  //     } finally {
  //       // setLoading(false); 
  //     }
  //   };
    
  //   fetchDetails();
    
  //   // Set a random thought on component mount
  //   setThought(thoughtsList[Math.floor(Math.random() * thoughtsList.length)]);

  //   // Update thought every hour
  //   const intervalId = setInterval(() => {
  //     setThought(thoughtsList[Math.floor(Math.random() * thoughtsList.length)]);
  //   }, 3600000); // 3600000 milliseconds = 1 hour

  //   return () => clearInterval(intervalId); // Clean up the interval on component unmount
  // }, []);

  useEffect(() => {
    if (!loading && user) {
      setUserName(user.firstName);
      setUserId(user._id);
      setJoiningDate(user.joiningDate);
    }

    setThought(thoughtsList[Math.floor(Math.random() * thoughtsList.length)]);

    const intervalId = setInterval(() => {
      setThought(thoughtsList[Math.floor(Math.random() * thoughtsList.length)]);
    }, 3600000);

    return () => clearInterval(intervalId);
  }, [loading, user]);

  // Show loading spinner or placeholder while userId is being fetched
  if (loading) {
    return <Loading/>;
  }

  if(user && user.position!='Employee'){
    navigate('/admin');
  }

  return (
    <>
      {user? (
        <div className={styles.dashboard}>
        <Sidebar activeComponent={'dashboard'}/> {/* Sidebar can render immediately */}

        <div className={styles.content}>
          <header className={styles.header}>
            <GreetingHeader username={userName} />
            <h3 className={styles.thought}>
              {thought} {/* Display the dynamic thought */}
            </h3>
          </header>

          <div className={styles.mainSection}>
            <div className={styles.calendarSection}>
              {joiningDate && <Calendar userId={userId} joiningDate={joiningDate} />}
            </div>
            <div className={styles.rightSection}>
              <ProgressBar /> {/* Progress bar doesn't depend on userId */}
              <div className={styles.upcomingDeadlines}>
                <h4>Upcoming Deadlines</h4>
                <ul>
                  <li>Project 1 Deadline: 25th May 2025</li>
                  <li>Project 2 Deadline: 1st June 2025</li>
                </ul>
              </div>
            </div>
          </div>

          {userId && (
            <div className={styles.tasks}>
              <TaskSection userId={userId} /> 
            </div>
          )}
        </div>
      </div>
      ):(
        <div>
            <LoginPage/>
        </div>
      )}
    </>

  );
}

export default Dashboard;
