import React, { useState } from 'react';
import styles from './styles/SortDropdown.module.css'; // Make sure to create this CSS module

const SortDropdown = ({ onSortChange }) => {
  const [sortOption, setSortOption] = useState('firstName'); // Default sort option

  const handleSortChange = (e) => {
    const selectedOption = e.target.value;
    setSortOption(selectedOption);
    onSortChange(selectedOption); // Notify parent component of the change
  };

  return (
    <div className={styles.sortDropdown}>
      <label htmlFor="sort">Sort by:</label>
      <select id="sort" value={sortOption} onChange={handleSortChange}>
        <option value="firstName">Name</option>
        <option value="joiningDate">Joining Date</option>
        <option value="role">Role</option>
      </select>
    </div>
  );
};

export default SortDropdown;
