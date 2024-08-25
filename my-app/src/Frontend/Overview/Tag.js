import React from 'react';
import './Tag.css'; // Assuming you're using a separate CSS file for styling

const Tag = ({ text }) => {
  return <span className="tag">{text}</span>;
};

export default Tag;
