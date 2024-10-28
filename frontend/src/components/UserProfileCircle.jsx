import React from 'react';
import styles from './styles/UserProfileCircle.module.css'; // Import the CSS styles

const colors = [
    '#FF5733', '#33FF57', '#3357FF', '#F4D03F', '#8E44AD', '#E67E22', '#2ECC71', '#3498DB'
];

// Function to get a color based on the first letter of the user's first name
const getColorByInitial = (initial) => {
    const index = initial.charCodeAt(0) % colors.length; // Use the character code to get a color
    return colors[index];
};

const UserProfileCircle = ({ user }) => {
    const initial = user.firstName.charAt(0).toUpperCase(); // Get the first initial

    return (
        <div className={styles.profileCircle} style={{ backgroundColor: getColorByInitial(initial) }}>
            <span className={styles.initial}>{initial}</span>
        </div>
    );
};

export default UserProfileCircle;
