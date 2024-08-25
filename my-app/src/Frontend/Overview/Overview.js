
import React from 'react';
import './Overview.css';
import './Tag.css';

const Overview = () => {
  return (
    <div className="overview">
      <div>
        <h1 className="overview-title">Overview</h1>
      </div>
      <div className="content">
        <div className="section">
          <h2 className="section-title">About HR Management System</h2>
          <p>Corecruiter is an online CRM system for recruiters and recruiting agencies that lets them keep records of candidates, save their resumes and monitor the hiring process of each recruiter. 
          For the comfort of communicating with candidates, the platform has its own messenger, and also a task tracker and calendar.</p>
        </div>
        <div className="section">
          <h2 className="section-title">Main Task</h2>
          <p>
          The main problem of users is that recruiters had to use several services to perform their tasks. It often took hours to find or systematize information.
        </p>
        <p>
          The main task of the service is to collect information in one place, so that the recruiter saves time spent on the process of finding and hiring an employee. 
          User-friendly platform lets them filter, sort and systematize information and make simple reports on the work done.
        </p>
        </div>
        <div className="section">
          <h2 className="section-title">What I did?</h2>
          <div className="tags">
            <span className="tag">Stakeholders Interview</span>
            <span className="tag">Business Research</span>
            <span className="tag">JTBD</span>
            <span className="tag">User Interview</span>
            <span className="tag">User Personas</span>
            <span className="tag">Information Architecture</span>
            <span className="tag">Wireframing</span>
            <span className="tag">Visual Design</span>
            <span className="tag">User Stories</span>
            <span className="tag">Design System</span>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
