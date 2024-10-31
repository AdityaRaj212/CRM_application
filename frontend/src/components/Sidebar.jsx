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
        if(userPosition==='Employee'){
          navigate('/');
        }else if(userPosition=='HR Admin'){
          navigate('/hr');
        }else{
          navigate('/admin');
        }
        break;
      
      case 'users':
        navigate('/users');
        break;

      case 'payroll':
        navigate('/payroll');
        break;

      case 'documents':
        navigate('/documents');
        break;

      case 'hierarchy':
        navigate('/hierarchy');
        break;

      case 'message':
        navigate('/chat');
        break;

      case 'help':
        navigate('/help');
        break;

      case 'settings':
        navigate('/settings');
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
        <li
          className={`${styles.menuItem} ${activeMenu === 'payroll' ? styles.active : ''}`}
          onClick={() => handleMenuClick('payroll')}
        >
          <span className={styles.icon}>💵</span>
          <span className={styles.text}>Payroll</span>
        </li>
        <li className={styles.menuItem}>
          <span className={styles.icon}>🖼️</span>
          <span className={styles.text}>Photos</span>
        </li>
        <li
          className={`${styles.menuItem} ${activeMenu === 'hierarchy' ? styles.active : ''}`}
          onClick={() => handleMenuClick('hierarchy')}
        >
          <span className={styles.icon}>📊</span>
          <span className={styles.text}>Hierarchy</span>
        </li>
        <li className={styles.menuItem}>
          <span className={styles.icon}>🗂️</span>
          <span className={styles.text}>Projects</span>
        </li>
        <li
          className={`${styles.menuItem} ${activeMenu === 'message' ? styles.active : ''}`}
          onClick={() => handleMenuClick('message')}
        >
          <span className={styles.icon}>💬</span>
          <span className={styles.text}>Message</span>
        </li>
        <li
          className={`${styles.menuItem} ${activeMenu === 'help' ? styles.active : ''}`}
          onClick={() => handleMenuClick('help')}
        >
          <span className={styles.icon}>❓</span>
          <span className={styles.text}>Help</span>
        </li>
        <li
          className={`${styles.menuItem} ${activeMenu === 'settings' ? styles.active : ''}`}
          onClick={() => handleMenuClick('settings')}
        >
          <span className={styles.icon}>⚙️</span>
          <span className={styles.text}>Setting</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
