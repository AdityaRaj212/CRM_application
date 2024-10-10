// FilterDropdown.jsx
import React from 'react';
import styles from './styles/FilterDropdown.module.css'; // Make sure to create this CSS module

const FilterDropdown = ({ onFilterChange, selectedFileType }) => {
    const handleFilterChange = (e) => {
        onFilterChange(e.target.value); // Notify parent component of the change
    };

    return (
        <div className={styles.filterDropdown}>
            {/* <label htmlFor="filter">Filter by File Type:</label> */}
            <select id="filter" value={selectedFileType} onChange={handleFilterChange}>
                <option value="">All</option>
                <option value="Documents">Documents</option>
                <option value="Images">Images</option>
                <option value="PDFs">PDFs</option>
            </select>
        </div>
    );
};

export default FilterDropdown;
