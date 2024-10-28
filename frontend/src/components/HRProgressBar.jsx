import React from 'react';
import styles from './styles/HRProgressBar.module.css';

const HRProgressBar = ({ completed, total }) => {
    const percentage = (completed / total) * 100;

    return (
        <div className={styles.progressBar}>
            <div className={styles.filler} style={{ width: `${percentage}%` }}>
                <span className={styles.label}>{percentage.toFixed(2)}%</span>
            </div>
        </div>
    );
};

export default HRProgressBar;
