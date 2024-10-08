import React from 'react';
import styles from './styles/GreetingHeader.module.css';

const GreetingHeader = ({ username }) => {
  // Get the current hour
  const currentHour = new Date().getHours();

  // Determine the greeting based on the time of day
  const getGreetingMessage = () => {
    if (currentHour < 12) {
      return `Good Morning ${username},`;
    } else if (currentHour < 18) {
      return `Good Afternoon ${username},`;
    } else {
      return `Good Evening ${username},`;
    }
  };

  return (
    <div className={styles.greetingHeader}>
      <div className={styles.greeting}>
        <p>{getGreetingMessage()}</p>
      </div>
      <div className={styles.profileSection}>
        <button className={styles.breakButton}>Take A Break</button>
        <button className={styles.resumeButton}>Resume Work</button>
        <div className={styles.profileAvatar}>
          <img src="./../../public/images/unknownUser.jpeg" alt="Profile Avatar" />
        </div>
      </div>
    </div>
  );
};

export default GreetingHeader;
