import React from 'react';
import './Architecture.css';

const Architecture = () => {
  return (
    <div className="architecture-container">
      <div className="architecture-header">
        <h1>Architecture</h1>
        <p>
          After I understood the needs of users and how to solve them, it’s time to decide on the main modules of the system. Here it was important to cover all user interaction scenarios.
        </p>
      </div>
      <div className="architecture-chart">
        <div className="parent-node">
          <div className="node corecruiter">
            Corecruiter CRM
          </div>
        </div>
        <div className="child-nodes">
          {[
            {
              title: 'Dashboard',
              items: ['Candidates Statistic', 'Recruiter Rating', 'Vacancies Overview', 'Candidate Funnel']
            },
            {
              title: 'Companies',
              items: ['Company Card', 'Filter & Search', 'Add New & Edit', 'Add Event or Note', 'Vacancy & Candidate Info']
            },
            {
              title: 'Vacancies',
              items: ['Vacancy Card', 'Filter & Search', 'Add New & Edit', 'Add Event, Task or Note', 'Status & Vacancy Info']
            },
            {
              title: 'Candidates',
              items: ['Candidate Card', 'Filter & Search', 'Add New & Edit', 'Add Event, Task or Note', 'Status & Candidate Info', 'Send Message']
            },
            {
              title: 'Messenger',
              items: ['Dialogue List', 'Filter & Search', 'Add Event, Task or Note', 'Send Message']
            },
            {
              title: 'My Profile',
              items: ['Edit & Add Profile Info', 'Notifications Settings', 'Delete Account', 'Log Out']
            },
            {
              title: 'Settings',
              items: ['Messenger Integrations', 'Notifications Settings', 'Add & Edit Statuses', 'Workspace Settings']
            }
          ].map((node, index) => (
            <div key={index} className="node-group">
              <div className="node">{node.title}</div>
              <div className="sub-nodes">
                {node.items.map((item, idx) => (
                  <div key={idx} className="sub-node">{item}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Architecture;