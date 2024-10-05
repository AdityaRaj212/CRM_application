import React from 'react';
import styles from './styles/ToDoTasks.module.css';

const ToDoTasks = ({ tasks }) => {
  return (
    <div className={styles.column}>
      <div className={styles.header}>
        <h3>To Do ({tasks.length})</h3>
        <button>Add new task</button>
      </div>
      {tasks.map((task) => (
        <div key={task.id} className={styles.taskCard}>
          <h4>{task.title}</h4>
          <p>{task.project}</p>
          <div className={styles.progressContainer}>
            <span>Progress</span>
            <div className={styles.progressBar}>
              <div className={styles.progress} style={{ width: `${(task.progress / task.total) * 100}%` }}></div>
            </div>
            <span>{task.progress}/{task.total}</span>
          </div>
          <div className={styles.dueDate}>{task.dueDate}</div>
          <div className={styles.footer}>
            <span>{task.comments} Comments</span>
            <span>{task.attachments} Attachments</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToDoTasks;
