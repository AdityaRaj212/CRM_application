import React from 'react';
import styles from './styles/GreetingHeader.module.css';

const GreetingHeader = ({ username }) => {
  return (
    <div className={styles.greetingHeader}>
      <div className={styles.greeting}>
        <p>Good Morning {username},</p>
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
