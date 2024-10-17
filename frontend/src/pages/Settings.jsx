import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './styles/Settings.module.css'; // Import the CSS file for styles
import Sidebar from '../components/Sidebar';
import GreetingHeader from '../components/GreetingHeader';
import { FaUser, FaEnvelope, FaPhone, FaLock, FaImage } from 'react-icons/fa';
import Modal from 'react-modal';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';
import axios from 'axios';
import PasswordChangeModal from '../modals/PasswordChangeModal';

const Settings = () => {
    const {user, loading} = useAuth();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [password, setPassword] = useState('');
    const [profileImg, setProfileImg] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        if (user) {
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setUserName(user.userName);
            setEmail(user.email);
            setMobileNo(user.mobileNo);
        }
    }, [user]);

    const handleFileChange = (e) => {
        setProfileImg(e.target.files[0]);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('userName', userName);
        formData.append('email', email);
        formData.append('mobileNo', mobileNo);
        formData.append('password', password);

        console.log(mobileNo);

        if (profileImg) {
            console.log(profileImg);
            formData.append('profileImg', profileImg);

            const formData2 = new FormData();
            formData2.append('userId', user._id);
            formData2.append('filename', profileImg.fileName);
            formData2.append('file', profileImg.filePath);
            formData2.append('description', `Profile image of ${user.firstName + ' ' + user.lastName}`);
        }

        try {
            await axios.put(`/api/users/${user._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Failed to update profile.');
        }
    };

    if(loading) return (<Loading/>);

    return (
        <div className={styles.dashboard}>
            <ToastContainer />
            <Sidebar activeComponent={'settings'} />
            <div className={styles.content}>
                <header className={styles.header}>
                    <GreetingHeader username={user.firstName} />
                </header>

                <div className={styles.mainSection}>
                    <h2 className={styles.sectionTitle}>Settings</h2>
                    <div className={styles.settingsContainer}>
                        <div className={styles.card}>
                            <h3 className={styles.cardTitle}><FaUser /> Personal Information</h3>
                            <form onSubmit={handleUpdate}>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="firstName">First Name</label>
                                    <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="lastName">Last Name</label>
                                    <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="userName">Username</label>
                                    <input type="text" id="userName" value={userName} onChange={(e) => setUserName(e.target.value)} required />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="email"><FaEnvelope /> Email</label>
                                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="mobileNo"><FaPhone /> Mobile No</label>
                                    <input type="tel" id="mobileNo" value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} required />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="password"><FaLock /> Password</label>
                                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="profileImg"><FaImage /> Profile Image</label>
                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        onChange={handleFileChange} 
                                    />
                                </div>
                                {/* <button className={styles.changePasswordButton} onClick={openModal}>
                                    Change Password
                                </button>
                                {showModal && <PasswordChangeModal closeModal={closeModal} />} */}
                                <button type="submit" className={styles.saveButton}>Save Changes</button>
                            </form>
                        </div>

                        {/* Additional Settings Section */}
                        {/* <div className={styles.card}>
                            <h3 className={styles.cardTitle}>Additional Options</h3>
                            <ul className={styles.additionalOptions}>
                                <li>Enable two-factor authentication</li>
                                <li>Change notification settings</li>
                                <li>Manage linked accounts</li>
                                <li>Privacy settings</li>
                            </ul>
                        </div> */}

                        {/* Placeholder for more settings */}
                        <div className={styles.placeholder}>
                            <p>More features coming soon! Stay tuned for updates.</p>
                        </div>
                    </div>

                    
                </div>
            </div>
        </div>
    );
};

export default Settings;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Sidebar from '../components/Sidebar';
// import GreetingHeader from '../components/GreetingHeader';
// import styles from './styles/Settings.module.css';
// import { useAuth } from '../context/AuthContext';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Loading from '../components/Loading';

// const Settings = () => {
//     const { loading, user } = useAuth();
//     const [firstName, setFirstName] = useState('');
//     const [lastName, setLastName] = useState('');
//     const [userName, setUserName] = useState('');
//     const [email, setEmail] = useState('');
//     const [mobileNo, setMobileNo] = useState('');
//     const [password, setPassword] = useState('');
//     const [profileImg, setProfileImg] = useState(null);

//     useEffect(() => {
//         if (user) {
//             setFirstName(user.firstName);
//             setLastName(user.lastName);
//             setUserName(user.userName);
//             setEmail(user.email);
//             setMobileNo(user.mobileNo);
//         }
//     }, [user]);

//     const handleFileChange = (e) => {
//         setProfileImg(e.target.files[0]);
//     };

//     const handleUpdate = async (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append('firstName', firstName);
//         formData.append('lastName', lastName);
//         formData.append('userName', userName);
//         formData.append('email', email);
//         formData.append('mobileNo', mobileNo);
//         formData.append('password', password);

//         console.log(mobileNo);

//         if (profileImg) {
//             formData.append('profileImg', profileImg);
//         }

//         try {
//             await axios.put(`/api/users/${user._id}`, formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });
//             toast.success('Profile updated successfully!');
//         } catch (error) {
//             console.error('Error updating profile:', error);
//             toast.error('Failed to update profile.');
//         }
//     };

//     if(loading) return (<Loading/>);

//     return (
//         <div className={styles.settingsContainer}>
//             <ToastContainer />
//             <Sidebar activeComponent={'settings'} />
//             <div className={styles.content}>
//                 <GreetingHeader username={user.firstName} />
//                 <h1 className={styles.title}>Settings</h1>
//                 <form className={styles.form} onSubmit={handleUpdate}>
//                     <div className={styles.field}>
//                         <label>First Name</label>
//                         <input 
//                             type="text" 
//                             value={firstName} 
//                             onChange={(e) => setFirstName(e.target.value)} 
//                             required 
//                         />
//                     </div>
//                     <div className={styles.field}>
//                         <label>Last Name</label>
//                         <input 
//                             type="text" 
//                             value={lastName} 
//                             onChange={(e) => setLastName(e.target.value)} 
//                             required 
//                         />
//                     </div>
//                     <div className={styles.field}>
//                         <label>Username</label>
//                         <input 
//                             type="text" 
//                             value={userName} 
//                             onChange={(e) => setUserName(e.target.value)} 
//                             required 
//                         />
//                     </div>
//                     <div className={styles.field}>
//                         <label>Email</label>
//                         <input 
//                             type="email" 
//                             value={email} 
//                             onChange={(e) => setEmail(e.target.value)} 
//                             required 
//                         />
//                     </div>
//                     <div className={styles.field}>
//                         <label>Mobile No</label>
//                         <input 
//                             type="text" 
//                             value={mobileNo} 
//                             onChange={(e) => setMobileNo(e.target.value)} 
//                             required 
//                         />
//                     </div>
//                     <div className={styles.field}>
//                         <label>Password</label>
//                         <input 
//                             type="password" 
//                             value={password} 
//                             onChange={(e) => setPassword(e.target.value)} 
//                         />
//                     </div>
//                     <div className={styles.field}>
//                         <label>Profile Image</label>
//                         <input 
//                             type="file" 
//                             accept="image/*" 
//                             onChange={handleFileChange} 
//                         />
//                     </div>
//                     <button type="submit" className={styles.updateButton}>Update Profile</button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Settings;
