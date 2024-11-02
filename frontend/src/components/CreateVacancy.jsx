// CreateVacancy.jsx
import React, { useState } from 'react';
import axios from 'axios';
import styles from './styles/CreateVacancy.module.css';
import { useAuth } from '../context/AuthContext';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateVacancy = ({ onClose }) => {
    const apiUrl = process.env.REACT_APP_API_BASE_URL;

    const {user} = useAuth();
    const [role, setRole] = useState('');
    const [deadline, setDeadline] = useState('');
    const [openings, setOpenings] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/vacancies/', {
                createdBy: user._id,
                role,
                deadline,
                openings,
            });
            toast.success('Vacancy created successfully!');
            onClose(); // Close the modal after successful creation
        } catch (error) {
            console.error('Error creating vacancy:', error);
            toast.error('Error creating vacancy. Please try again.');
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <h2>Create New Vacancy</h2>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label>Role</label>
                        <input 
                            type="text" 
                            value={role} 
                            onChange={(e) => setRole(e.target.value)} 
                            required 
                            placeholder="Enter the job role" 
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Deadline</label>
                        <input 
                            type="date" 
                            value={deadline} 
                            onChange={(e) => setDeadline(e.target.value)} 
                            required 
                            min={new Date().toISOString().split('T')[0]} // Disable past dates
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Open Positions</label>
                        <input 
                            type="number" 
                            value={openings} 
                            onChange={(e) => setOpenings(e.target.value)} 
                            required 
                            placeholder="Number of positions available" 
                        />
                    </div>
                    <div className={styles.buttonContainer}>
                        <button type="button" onClick={onClose} className={styles.cancelButton}>Cancel</button>
                        <button type="submit" className={styles.submitButton}>Create Vacancy</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateVacancy;


// // CreateVacancy.jsx
// import React, { useState } from 'react';
// import axios from 'axios';
// import styles from './styles/CreateVacancy.module.css';

// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useAuth } from '../context/AuthContext';

// const CreateVacancy = ({ onClose }) => {
//     const {user} = useAuth();
//     const [role, setRole] = useState('');
//     const [deadline, setDeadline] = useState('');
//     const [openings, setOpenings] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.post('/api/vacancies/', {
//                 createdBy: user._id,
//                 role,
//                 deadline,
//                 openings,
//             });
//             toast.success('Vacancy created successfully!');
//             onClose(); // Close the modal after successful creation
//         } catch (error) {
//             console.error('Error creating vacancy:', error);
//             toast.error('Error creating vacancy. Please try again.');
//         }
//     };

//     return (
//         <div className={styles.modal}>
//             <ToastContainer/>
//             <h2>Create New Vacancy</h2>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>Role</label>
//                     <input 
//                         type="text" 
//                         value={role} 
//                         onChange={(e) => setRole(e.target.value)} 
//                         required 
//                     />
//                 </div>
//                 <div>
//                     <label>Deadline</label>
//                     <input 
//                         type="date" 
//                         value={deadline} 
//                         onChange={(e) => setDeadline(e.target.value)} 
//                         required 
//                     />
//                 </div>
//                 <div>
//                     <label>Open Positions</label>
//                     <input 
//                         type="number" 
//                         value={openings} 
//                         onChange={(e) => setOpenings(e.target.value)} 
//                         required 
//                     />
//                 </div>
//                 <button type="submit">Create Vacancy</button>
//                 <button type="button" onClick={onClose}>Cancel</button>
//             </form>
//         </div>
//     );
// };

// export default CreateVacancy;
