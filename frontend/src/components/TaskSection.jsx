import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { GoLink } from "react-icons/go";
import { TfiCommentAlt } from "react-icons/tfi";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './styles/TaskSection.module.css';

const TaskSection = ({ userId }) => {
  const [tasks, setTasks] = useState({ todo: [], inProgress: [], done: [] });
  const [users, setUsers] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [newTask, setNewTask] = useState({
    name: '',
    description: '',
    dueDate: '',
    assignedTo: userId,
    checkpoints: [{ description: '', completed: false }],
    comments: [],
    file: null
  });
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchTasks = async () => {
      if (userId) {
        try {
          const response = await axios.get(`/api/tasks/get-task-assigned-to-user/${userId}`);
          const fetchedTasks = response.data.tasks;

          const todo = fetchedTasks.filter(task => task.status === 'To-Do');
          const inProgress = fetchedTasks.filter(task => task.status === 'In-progress');
          const done = fetchedTasks.filter(task => task.status === 'Completed');

          setTasks({ todo, inProgress, done });
        } catch (err) {
          console.error('Error while fetching tasks:', err);
        }
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get(`/api/users/`);
        setUsers(response.data.users);
      } catch (err) {
        console.error('Error while fetching users:', err);
      }
    };

    fetchTasks();
    fetchUsers();
  }, [userId]);

  const openModal = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
    setIsEditMode(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const openTaskModal = () => {
    setIsTaskModalOpen(true);
  };

  const closeTaskModal = () => {
    setIsTaskModalOpen(false);
    setNewTask({
      name: '',
      description: '',
      dueDate: '',
      assignedTo: userId,
      checkpoints: [{ description: '', completed: false }],
      comments: [],
      file: null
    });
  };

  const handleTaskInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    console.log(e.target.files);
    console.log(e.target.files[0]);
    setNewTask(prevState => ({
      ...prevState,
      file: e.target.files[0]
    }));
  };

  const handleCheckpointChange = (index, value) => {
    const updatedCheckpoints = [...newTask.checkpoints];
    updatedCheckpoints[index].description = value;
    setNewTask(prevState => ({ ...prevState, checkpoints: updatedCheckpoints }));
  };

  const addCheckpoint = () => {
    setNewTask(prevState => ({
      ...prevState,
      checkpoints: [...prevState.checkpoints, { description: '', completed: false }]
    }));
  };

  const removeCheckpoint = (index) => {
    if (newTask.checkpoints.length > 1) {
      const updatedCheckpoints = newTask.checkpoints.filter((_, idx) => idx !== index);
      setNewTask(prevState => ({ ...prevState, checkpoints: updatedCheckpoints }));
    } else {
      toast.error("At least one checkpoint is required.");
    }
  };

  const handleCommentChange = (index, value) => {
    const updatedComments = [...newTask.comments];
    updatedComments[index] = value;
    setNewTask(prevState => ({ ...prevState, comments: updatedComments }));
  };

  const addComment = () => {
    setNewTask(prevState => ({
      ...prevState,
      comments: [...prevState.comments, '']
    }));
  };

  const removeComment = (index) => {
    const updatedComments = newTask.comments.filter((_, idx) => idx !== index);
    setNewTask(prevState => ({ ...prevState, comments: updatedComments }));
  };

  // Add task to To-Do list
  const addTask = async () => {
    const formData = new FormData();
    formData.append('name', newTask.name || '');
    formData.append('description', newTask.description || '');
    formData.append('dueDate', newTask.dueDate || '');
    formData.append('assignedTo', newTask.assignedTo || '');

    newTask.checkpoints.forEach((checkpoint, index) => {
      formData.append(`checkpoints[${index}][description]`, checkpoint.description || '');
      formData.append(`checkpoints[${index}][completed]`, checkpoint.completed);
    });

    newTask.comments.forEach((comment, index) => {
      formData.append(`comments[${index}]`, comment);
    });

    if (newTask.file) {
      formData.append('file', newTask.file);
    }

    try {
      const response = await axios.post('/api/tasks/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      toast.success('Task added successfully!');

      setTasks((prevTasks) => ({
        ...prevTasks,
        todo: [...prevTasks.todo, response.data.task],
      }));

      closeTaskModal();
    } catch (err) {
      console.error('Error while adding task:', err);
      toast.error(err.response?.data?.error || 'Failed to add task.');
      // toast.error('Failed to add task.');
    }
  };

  const toggleCheckpoint = async (index) => {
    if (!isEditMode){
      toast.info('Enable Edit mode to toggle checkpoint status');
      return;
    }
    const updatedCheckpoints = [...selectedTask.checkpoints];
    updatedCheckpoints[index].completed = !updatedCheckpoints[index].completed;

    const updatedStatus = getUpdatedTaskStatus(updatedCheckpoints);
    const updatedTask = { ...selectedTask, checkpoints: updatedCheckpoints, status: updatedStatus };

    try {
      await axios.put(`/api/tasks/update/${selectedTask._id}`, updatedTask);
      setSelectedTask(updatedTask); // Update the state with the new task

      // Update tasks in the relevant section without fetching again
      const updatedTasks = { ...tasks };
      if (updatedStatus === 'In-progress') {
        updatedTasks.todo = updatedTasks.todo.filter(task => task._id !== selectedTask._id);
        updatedTasks.inProgress.push(updatedTask);
      } else if (updatedStatus === 'Completed') {
        updatedTasks.inProgress = updatedTasks.inProgress.filter(task => task._id !== selectedTask._id);
        updatedTasks.done.push(updatedTask);
      } else {
        updatedTasks.inProgress = updatedTasks.inProgress.filter(task => task._id !== selectedTask._id);
        updatedTasks.todo.push(updatedTask);
      }
      setTasks(updatedTasks);
      toast.success('Task updated successfully!');
    } catch (err) {
      console.error('Error updating task:', err);
      toast.error('Failed to update task.');
    }
  };

  const getUpdatedTaskStatus = (checkpoints) => {
    const completedCheckpoints = checkpoints.filter(cp => cp.completed).length;
    if (completedCheckpoints === checkpoints.length && completedCheckpoints > 0) {
      return 'Completed';
    } else if (completedCheckpoints > 0) {
      return 'In-progress';
    }
    return 'To-Do';
  };

  const renderTaskCard = (task) => {
    const totalCheckpoints = task.checkpoints.length;
    const completedCheckpoints = task.checkpoints.filter(cp => cp.completed).length;
    const percentage = (completedCheckpoints / totalCheckpoints) * 100;
    const progressColor = getProgressColor(percentage);
    const dueDateClass = getDateClass(task.dueDate);

    return (
      <div key={task._id} className={styles.taskCard} onClick={() => openModal(task)}>
        <h4>{task.name}</h4>
        <p>{task.project}</p>
        <div className={styles.progressContainer}>
          <span>Progress</span>
          <div className={styles.progressBar}>
            <div className={`${styles.progress} ${progressColor}`} style={{ width: `${percentage}%` }}></div>
          </div>
          <span>{completedCheckpoints}/{totalCheckpoints}</span>
        </div>
        <div className={styles.footer}>
          <div className={`${styles.dueDate} ${dueDateClass}`}>{new Date(task.dueDate).toDateString()}</div>
          <span><TfiCommentAlt /> {task.comments.length}</span>
          <span><GoLink /> {task.attachments?.length}</span>
        </div>
      </div>
    );
  };

  const getProgressColor = (percentage) => {
    if (percentage < 30) return styles.red;
    if (percentage >= 30 && percentage < 60) return styles.yellow;
    if (percentage >= 60 && percentage < 100) return styles.orange;
    return styles.green;
  };

  const getDateClass = (dueDate) => {
    const currentDate = new Date();
    const dueDateObj = new Date(dueDate);
    const timeDiff = currentDate - dueDateObj;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (daysDiff > 60) return styles.greyDate;
    if (daysDiff > 2) return styles.redDate;
    if (daysDiff <= 2 && daysDiff >= 0) return styles.orangeDate;
    return styles.defaultDate;
  };

  const handleDeleteTask = async (taskId, category) => {
    try {
      const response = await axios.delete(`/api/tasks/delete/${taskId}`);
  
      console.log(response);

      if (!response.data.status) {
        toast.error('Failed to delete the task');
        throw new Error('Failed to delete the task');
      }
  
      setTasks((prevTasks) => {
        return {
          ...prevTasks,
          [category]: Array.isArray(prevTasks[category]) 
            ? prevTasks[category].filter(task => task.id !== taskId)
            : []
        };
      });
      setIsModalOpen(false);

  
      console.log('Task deleted successfully');
      toast.success('Task deleted successfully');
    } catch (err) {
      console.error('Error deleting task:', err);
      toast.error('Failed to delete the task. Please try again.');
    }
  }
  

  return (
    <div className={styles.taskSection}>
      <ToastContainer /> {/* Toast container for notifications */}
      <div className={`${styles.column} ${styles.todo}`}>
        <div className={styles.header}>
          <h3>To Do</h3>
          <button onClick={openTaskModal} className={styles.addTaskBtn}>+ Add Task</button>
        </div>
        {tasks.todo.map(renderTaskCard)}
      </div>

      <div className={`${styles.column} ${styles.inProgress}`}>
        <div className={styles.header}>
          <h3>In Progress</h3>
        </div>
        {tasks.inProgress.map(renderTaskCard)}
      </div>

      <div className={`${styles.column} ${styles.done}`}>
        <div className={styles.header}>
          <h3>Completed</h3>
        </div>
        {tasks.done.map(renderTaskCard)}
      </div>

      {/* Modal for adding a new task */}
      <Modal
        isOpen={isTaskModalOpen}
        onRequestClose={closeTaskModal}
        className={styles.taskModalContent}
        overlayClassName={styles.modalOverlay}
      >
        <div className={styles.modalBody}>
          <h2>Add New Task</h2>
          <input
            type="text"
            name="name"
            placeholder="Task Title"
            value={newTask.name}
            onChange={handleTaskInputChange}
            className={styles.inputField}
          />
          <textarea
            name="description"
            placeholder="Task Description"
            value={newTask.description}
            onChange={handleTaskInputChange}
            className={styles.textAreaField}
          />
          <input
            type="date"
            name="dueDate"
            value={newTask.dueDate}
            onChange={handleTaskInputChange}
            className={styles.inputField}
          />
          
          <select name="assignedTo" value={newTask.assignedTo} onChange={handleTaskInputChange} className={styles.inputField}>
            <option value="">Assign to User</option>
            {users.map(user => (
              <option key={user._id} value={user._id}>{user.name}</option>
            ))}
          </select>

          <div className={styles.checkpoints}>
            <h4>Checkpoints</h4>
            {newTask.checkpoints.map((checkpoint, index) => (
              <div key={index} className={styles.checkpointInput}>
                <input
                  type="text"
                  placeholder={`Checkpoint ${index + 1}`}
                  value={checkpoint.description}
                  onChange={(e) => handleCheckpointChange(index, e.target.value)}
                  className={styles.inputField}
                />
                <button onClick={() => removeCheckpoint(index)} className={styles.removeCheckpointBtn}>Remove</button>
              </div>
            ))}
            <button onClick={addCheckpoint} className={styles.addCheckpointBtn}>+ Add Checkpoint</button>
          </div>

          <div className={styles.fileUpload}>
            <label htmlFor="file">Attach File</label>
            <input type="file" id="file" name="file" onChange={handleFileChange} />
          </div>

          <button onClick={addTask} className={styles.saveTaskBtn}>Create Task</button>
        </div>
      </Modal>

      {/* Modal for showing task details */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className={styles.modalContent}
        overlayClassName={styles.modalOverlay}
      >
        {selectedTask && (
          <div className={styles.modalBody}>
            <div className={styles.modalHeader}>
              <h2>{selectedTask.name}</h2>
              <button onClick={() => setIsEditMode(!isEditMode)} className={styles.editBtn}>
                {isEditMode ? 'Done Editing' : 'Edit'}
              </button>
            </div>
            <p>{selectedTask.description}</p>
            <h3>Checklist</h3>
            <div className={styles.checklist}>
              {selectedTask.checkpoints.map((checkpoint, index) => (
                <div
                  key={index}
                  className={`${styles.checkpoint} ${checkpoint.completed ? styles.checked : styles.unchecked}`}
                  onClick={() => toggleCheckpoint(index)}
                >
                  <label className={styles.checkboxContainer}>
                    <input
                      type="checkbox"
                      checked={checkpoint.completed}
                      onChange={() => toggleCheckpoint(index)}
                      disabled={!isEditMode} // Only allow checking when in edit mode
                    />
                    <span className={styles.checkmark}></span>
                  </label>
                  <span className={styles.checkpointText}>{checkpoint.description}</span>
                </div>
              ))}
            </div>
            <h3>Comments</h3>
            <p>{selectedTask.comments.length} Comments</p>
            <h3>Attachments</h3>
            <p>{selectedTask.attachments?.length} Attachments</p>
            <div className={styles.modalFooter}>
              <button onClick={()=>{
                if(selectedTask.status==='To-Do'){
                  handleDeleteTask(selectedTask._id, 'todo');        // Deletes task from todo list
                }
                if(selectedTask.status==='In-progress'){
                  handleDeleteTask(selectedTask._id, 'inProgress');  // Deletes task from inProgress list
                }
                if(selectedTask.status==='Completed'){
                  handleDeleteTask(selectedTask._id, 'done');        // Deletes task from done list
                }
              }} className={styles.deleteBtn}>
                Delete
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default TaskSection;





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Modal from 'react-modal';
// import { GoLink } from "react-icons/go";
// import { TfiCommentAlt } from "react-icons/tfi";
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import styles from './styles/TaskSection.module.css';

// const TaskSection = ({ userId }) => {
//   const [tasks, setTasks] = useState({ todo: [], inProgress: [], done: [] });
//   const [selectedTask, setSelectedTask] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isTaskModalOpen, setIsTaskModalOpen] = useState(false); // Modal for adding tasks
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [checkpoints, setCheckpoints] = useState([]);
//   const [newTask, setNewTask] = useState({
//     name: '',
//     description: '',
//     dueDate: '',
//     project: '',
//     checkpoints: [],
//     assignedTo: userId
//   });

//   useEffect(() => {
//     const fetchTasks = async () => {
//       if (userId) {
//         try {
//           const response = await axios.get(`/api/tasks/get-task-assigned-to-user/${userId}`);
//           const fetchedTasks = response.data.tasks;

//           const todo = fetchedTasks.filter(task => task.status === 'To-Do');
//           const inProgress = fetchedTasks.filter(task => task.status === 'In-progress');
//           const done = fetchedTasks.filter(task => task.status === 'Completed');

//           setTasks({ todo, inProgress, done });
//         } catch (err) {
//           console.error('Error while fetching tasks:', err);
//         }
//       }
//     };
//     fetchTasks();
//   }, [userId]);

//   const getProgressColor = (percentage) => {
//     if (percentage < 30) return styles.red;
//     if (percentage >= 30 && percentage < 60) return styles.yellow;
//     if (percentage >= 60 && percentage < 100) return styles.orange;
//     return styles.green;
//   };

//   const getDateClass = (dueDate) => {
//     const currentDate = new Date();
//     const dueDateObj = new Date(dueDate);
//     const timeDiff = currentDate - dueDateObj;
//     const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

//     if (daysDiff > 60) return styles.greyDate;
//     if (daysDiff > 2) return styles.redDate;
//     if (daysDiff <= 2 && daysDiff >= 0) return styles.orangeDate;
//     return styles.defaultDate;
//   };

//   const openModal = (task) => {
//     setSelectedTask(task);
//     setCheckpoints(task.checkpoints);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedTask(null);
//     setIsEditMode(false);
//   };

//   const toggleCheckpoint = (index) => {
//     if (!isEditMode) return;
//     const newCheckpoints = [...checkpoints];
//     newCheckpoints[index].completed = !newCheckpoints[index].completed;
//     setCheckpoints(newCheckpoints);
//   };

//   const saveCheckpoints = async () => {
//     if (!selectedTask) return;
//     try {
//       await axios.put(`/api/tasks/update-checkpoint/${selectedTask._id}`, { checkpoints });
//       const updatedTasks = tasks.todo.map(task =>
//         task._id === selectedTask._id ? { ...task, checkpoints } : task
//       );
//       setTasks({ ...tasks, todo: updatedTasks });
//       toast.success('Task checkpoints updated successfully!');
//     } catch (err) {
//       console.error('Error updating checkpoints:', err);
//       toast.error('Failed to update task checkpoints.');
//     }
//   };

//   const getCompletedCheckpointsCount = (task) => {
//     if (!task.checkpoints) return 0;
//     return task.checkpoints.filter(cp => cp.completed).length;
//   };

//   // Open task creation modal
//   const openTaskModal = () => {
//     setIsTaskModalOpen(true);
//   };

//   // Close task creation modal
//   const closeTaskModal = () => {
//     setIsTaskModalOpen(false);
//     setNewTask({
//       name: '',
//       description: '',
//       dueDate: '',
//       project: '',
//       checkpoints: [],
//       assignedTo: userId
//     });
//   };

//   const handleTaskInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewTask(prevState => ({
//       ...prevState,
//       [name]: value
//     }));
//   };

//   // Add task to To-Do list
//   const addTask = async () => {
//     try {
//       const response = await axios.post('/api/tasks/add', newTask);
//       toast.success('Task added successfully!');

//       // Refresh tasks after adding
//       setTasks((prevTasks) => ({
//         ...prevTasks,
//         todo: [...prevTasks.todo, response.data.task]
//       }));

//       closeTaskModal();
//     } catch (err) {
//       console.error('Error while adding task:', err);
//       toast.error('Failed to add task.');
//     }
//   };

//   const renderTaskCard = (task) => {
//     const totalCheckpoints = task.checkpoints.length;
//     const completedCheckpoints = getCompletedCheckpointsCount(task);
//     const percentage = (completedCheckpoints / totalCheckpoints) * 100;
//     const progressColor = getProgressColor(percentage);
//     const dueDateClass = getDateClass(task.dueDate);

//     return (
//       <div key={task._id} className={styles.taskCard} onClick={() => openModal(task)}>
//         <h4>{task.name}</h4>
//         <p>{task.project}</p>
//         <div className={styles.progressContainer}>
//           <span>Progress</span>
//           <div className={styles.progressBar}>
//             <div className={`${styles.progress} ${progressColor}`} style={{ width: `${percentage}%` }}></div>
//           </div>
//           <span>{completedCheckpoints}/{totalCheckpoints}</span>
//         </div>
//         <div className={styles.footer}>
//           <div className={`${styles.dueDate} ${dueDateClass}`}>{new Date(task.dueDate).toDateString()}</div>
//           <span><TfiCommentAlt /> {task.comments.length}</span>
//           <span><GoLink /> {task.attachments.length}</span>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className={styles.taskSection}>
//       <ToastContainer /> {/* Toast container for notifications */}
//       <div className={`${styles.column} ${styles.todo}`}>
//         <div className={styles.header}>
//           <h3>To Do</h3>
//           <button onClick={openTaskModal} className={styles.addTaskBtn}>+ Add Task</button> {/* Add Task Button */}
//         </div>
//         {tasks.todo.map(renderTaskCard)}
//       </div>

//       {/* Modal for adding a new task */}
//       <Modal
//         isOpen={isTaskModalOpen}
//         onRequestClose={closeTaskModal}
//         className={styles.taskModalContent}
//         overlayClassName={styles.modalOverlay}
//       >
//         <div className={styles.modalBody}>
//           <h2>Add New Task</h2>
//           <input
//             type="text"
//             name="name"
//             placeholder="Task Title"
//             value={newTask.name}
//             onChange={handleTaskInputChange}
//             className={styles.inputField}
//           />
//           <textarea
//             name="description"
//             placeholder="Task Description"
//             value={newTask.description}
//             onChange={handleTaskInputChange}
//             className={styles.textAreaField}
//           />
//           <input
//             type="date"
//             name="dueDate"
//             value={newTask.dueDate}
//             onChange={handleTaskInputChange}
//             className={styles.inputField}
//           />
//           <input
//             type="text"
//             name="project"
//             placeholder="Project Name"
//             value={newTask.project}
//             onChange={handleTaskInputChange}
//             className={styles.inputField}
//           />
//           <button onClick={addTask} className={styles.saveTaskBtn}>Save Task</button>
//           <button onClick={closeTaskModal} className={styles.cancelTaskBtn}>Cancel</button>
//         </div>
//       </Modal>

//       {/* Modal for showing task details */}
//       <Modal
//         isOpen={isModalOpen}
//         onRequestClose={closeModal}
//         className={styles.modalContent}
//         overlayClassName={styles.modalOverlay}
//       >
//         {selectedTask && (
//           <div className={styles.modalBody}>
//             <div className={styles.modalHeader}>
//               <h2>{selectedTask.name}</h2>
//               <button onClick={() => setIsEditMode(!isEditMode)} className={styles.editBtn}>
//                 {isEditMode ? 'Cancel Edit' : 'Edit'}
//               </button>
//             </div>
//             <p>{selectedTask.description}</p>

//             <h3>Checklist</h3>
//             <div className={styles.checklist}>
//               {checkpoints.map((checkpoint, index) => (
//                 <div
//                   key={index}
//                   className={`${styles.checkpoint} ${checkpoint.completed ? styles.checked : styles.unchecked}`}
//                   onClick={() => toggleCheckpoint(index)}
//                 >
//                   <label className={styles.checkboxContainer}>
//                     <input
//                       type="checkbox"
//                       checked={checkpoint.completed}
//                       onChange={() => toggleCheckpoint(index)}
//                     />
//                     <span className={styles.checkmark}></span>
//                   </label>
//                   <span className={styles.checkpointText}>{checkpoint.description}</span>
//                 </div>
//               ))}
//             </div>

//             <h3>Comments</h3>
//             <p>{selectedTask.comments.length} Comments</p>

//             <h3>Attachments</h3>
//             <p>{selectedTask.attachments.length} Attachments</p>

//             {isEditMode && (
//               <button onClick={saveCheckpoints} className={styles.saveBtn}>Save Changes</button>
//             )}
//           </div>
//         )}
//       </Modal>

//       <div className={`${styles.column} ${styles.inProgress}`}>
//         <h3>In Progress</h3>
//         {tasks.inProgress.map(renderTaskCard)}
//       </div>

//       <div className={`${styles.column} ${styles.completed}`}>
//         <h3>Done</h3>
//         {tasks.done.map(renderTaskCard)}
//       </div>
//     </div>
//   );
// };

// export default TaskSection;