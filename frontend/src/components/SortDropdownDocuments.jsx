// SortDropdown.jsx
import React, { useState } from 'react';
import styles from './styles/SortDropdown.module.css'; 

const SortDropdown = ({ onSortChange }) => {
    const [sortOption, setSortOption] = useState('uploadDate'); // Default sort option

    const handleSortChange = (e) => {
        const selectedOption = e.target.value;
        setSortOption(selectedOption);
        onSortChange(selectedOption); // Notify parent component of the change
    };

    return (
        <div className={styles.sortDropdown}>
            {/* <label htmlFor="sort">Sort by:</label> */}
            <select id="sort" value={sortOption} onChange={handleSortChange}>
                <option value="uploadDate">Upload Date</option>
                <option value="filename">Filename</option>
                <option value="user">Uploader</option>
            </select>
        </div>
    );
};

export default SortDropdown;
