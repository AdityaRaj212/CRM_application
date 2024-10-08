// FilterDropdown.jsx
import React from 'react';
import styles from './styles/FilterDropdown.module.css'; // Make sure to create this CSS module

const FilterDropdown = ({ onFilterChange, selectedPosition }) => {
  const handleFilterChange = (e) => {
    onFilterChange(e.target.value); // Notify parent component of the change
  };

  return (
    <div className={styles.filterDropdown}>
      <label htmlFor="filter">Filter by Position:</label>
      <select id="filter" value={selectedPosition} onChange={handleFilterChange}>
        <option value="">All</option>
        <option value="Admin">Admin</option>
        <option value="HR Admin">HR Admin</option>
        <option value="Employee">Employee</option>
        <option value="Super Admin">Super Admin</option>
      </select>
    </div>
  );
};

export default FilterDropdown;
