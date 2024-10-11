import React from 'react';
import styles from './styles/FilterDropdown.module.css';

const FilterDropdown = ({ onFilterChange, selectedFileType }) => {
    const handleFilterChange = (e) => {
        onFilterChange(e.target.value); // Notify parent component of the change
    };

    return (
        <div className={styles.filterDropdown}>
            <select id="filter" value={selectedFileType} onChange={handleFilterChange}>
                <option value="">All</option>
                <option value="application/pdf">PDFs</option>
                {/* <optgroup label="Images">
                    <option value="image/jpeg">JPEG</option>
                    <option value="image/png">PNG</option>
                </optgroup> */}
                <option value="image/jpeg">JPEG Images</option>
                <option value="image/png">PNG Images</option>
                <option value="application/vnd.openxmlformats-officedocument.wordprocessingml.document">Documents</option>
                <option value="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">Spreadsheets</option>
                <option value="application/vnd.openxmlformats-officedocument.presentationml.presentation">Presentations</option>
            </select>
        </div>
    );
};

export default FilterDropdown;
