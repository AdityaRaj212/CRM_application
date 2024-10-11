import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles/Sidebar.module.css';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({activeComponent}) => {
  const {loading, user} = useAuth();
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState(activeComponent); // State for active menu
  const [userPosition, setUserPosition] = useState('');

  useEffect(()=>{
    if(!loading && user){
      setUserPosition(user.position);
    }
  },[loading, user]);

  const handleMenuClick = (menu) => {
    setActiveMenu(menu); // Set the active menu
    switch(menu){
      case 'dashboard':
        navigate('/admin');
        break;
      
      case 'users':
        navigate('/users');
        break;

      case 'documents':
        navigate('/documents');
        break;

      default:
        navigate('/');
    }
    // navigate(menu === 'dashboard' ? '/admin' : '/users'); // Navigate based on menu
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.brand}>
        <h2>Prajnan</h2>
      </div>
      <ul className={styles.menuList}>
        <li 
          className={`${styles.menuItem} ${activeMenu === 'dashboard' ? styles.active : ''}`} 
          onClick={() => handleMenuClick('dashboard')}
        >
          <span className={styles.icon}>⌘</span>
          <span className={styles.text}>Dashboard</span>
        </li>

        {(userPosition!=='Employee') && 
          <li 
            className={`${styles.menuItem} ${activeMenu === 'users' ? styles.active : ''}`} 
            onClick={() => handleMenuClick('users')}
          >
            <span className={styles.icon}>📊</span>
            <span className={styles.text}>Users</span>
          </li>
        }
        <li
          className={`${styles.menuItem} ${activeMenu === 'documents' ? styles.active : ''}`}
          onClick={() => handleMenuClick('documents')}
        >
          <span className={styles.icon}>📄</span>
          <span className={styles.text}>Documents</span>
        </li>
        <li className={styles.menuItem}>
          <span className={styles.icon}>🖼️</span>
          <span className={styles.text}>Photos</span>
        </li>
        <li className={styles.menuItem}>
          <span className={styles.icon}>📊</span>
          <span className={styles.text}>Hierarchy</span>
        </li>
        <li className={styles.menuItem}>
          <span className={styles.icon}>🗂️</span>
          <span className={styles.text}>Projects</span>
        </li>
        <li className={styles.menuItem}>
          <span className={styles.icon}>💬</span>
          <span className={styles.text}>Message</span>
        </li>
        <li className={styles.menuItem}>
          <span className={styles.icon}>❓</span>
          <span className={styles.text}>Help</span>
        </li>
        <li className={styles.menuItem}>
          <span className={styles.icon}>⚙️</span>
          <span className={styles.text}>Setting</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
