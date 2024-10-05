import React from 'react';
import styles from './styles/Sidebar.module.css';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.brand}>
        <h2>Prajnan</h2>
      </div>
      <ul className={styles.menuList}>
        <li className={`${styles.menuItem} ${styles.active}`}>
          <span className={styles.icon}>⌘</span>
          <span className={styles.text}>Dashboard</span>
        </li>
        <li className={styles.menuItem}>
          <span className={styles.icon}>📊</span>
          <span className={styles.text}>Users</span>
        </li>
        <li className={styles.menuItem}>
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
