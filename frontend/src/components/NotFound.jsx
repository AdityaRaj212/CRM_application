// src/NotFound.js
import React from 'react';
import styles from './styles/NotFound.module.css';

const NotFound = () => {
    return (
        <div className={styles.container}>
            <div className={styles.errorCode}>404</div>
            <div className={styles.errorMessage}>Page Not Found</div>
            <div className={styles.errorDescription}>
                Oops! It seems the page you are looking for does not exist.
                <br />
                Try checking the URL for mistakes or return to the home page.
            </div>
            <a href="/" className={styles.homeButton}>Go to Home</a>
            <div className={styles.techDesign}>
                <div className={styles.circuit}></div>
                <div className={styles.circuit}></div>
                <div className={styles.circuit}></div>
            </div>
        </div>
    );
};

export default NotFound;
