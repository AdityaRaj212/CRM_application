import React from 'react';
import styles from './styles/ProgressBar.module.css';

const ProgressBar = () => {
  return (
    <div className={styles.progressBar}>
      <h4 className={styles.title}>Project Progress</h4>
      <div className={styles.progress}>
        <div className={styles.track}></div>
      </div>
    </div>
  );
}

export default ProgressBar;
