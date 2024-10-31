import React, { useEffect, useState, useRef } from 'react';
import styles from './styles/GreetingHeader.module.css';
import { useAuth } from '../context/AuthContext';
import { FaSignOutAlt } from 'react-icons/fa'; // Icon for logout
import UserProfileCircle from './UserProfileCircle';

const GreetingHeader = ({ username }) => {
  const { loading, user, logout } = useAuth();
  const [position, setPosition] = useState('Admin');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown visibility
  const dropdownRef = useRef(null); // Ref to access the dropdown element

  useEffect(() => {
    if (!loading && user) {
      setPosition(user.position);
    }
  }, [loading, user]);

  // Get the current hour
  const currentHour = new Date().getHours();

  // Determine the greeting based on the time of day
  const getGreetingMessage = () => {
    if (currentHour < 12) {
      return `Good Morning ${username}`;
    } else if (currentHour < 18) {
      return `Good Afternoon ${username}`;
    } else {
      return `Good Evening ${username}`;
    }
  };

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false); // Close dropdown after logout
  };

  // Close dropdown if clicked outside
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    // Add event listener to handle clicks outside
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.greetingHeader}>
      <div className={styles.greeting}>
        <p>{getGreetingMessage()}</p>
      </div>
      <div className={styles.breakOptions}>
        {position === 'Employee' && (
          <>
            <button className={styles.breakButton}>Take A Break</button>
            <button className={styles.resumeButton}>Resume Work</button>
          </>
        )}
      </div>
      <div className={styles.profileSection} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        {/* <div className={styles.profileAvatar}>
          <img src="./../public/images/unknownUser.jpeg" alt="Profile Avatar" />
        </div> */}
        <UserProfileCircle user={user}/>
        <div className={styles.userInfo}>
          <p className={styles.username}>{username}</p>
          <p className={styles.position}>{position}</p>
        </div>
      </div>

      {/* Dropdown for logout */}
      {isDropdownOpen && (
        <div className={styles.dropdown} ref={dropdownRef}>
          <h2>Logout</h2>
          <p>Are you sure you want to logout?</p>
          <div className={styles.dropdownActions}>
            <button className={styles.logoutButton} onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GreetingHeader;
