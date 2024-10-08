import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import styles from './styles/AddUserModal.module.css';
import { toast } from 'react-toastify'; // For notifications
import axios from 'axios'; // For API calls

import { ImCheckboxChecked } from "react-icons/im";
import { ImCheckboxUnchecked } from "react-icons/im";

const AddUserModal = ({ isOpen, onRequestClose, user }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [position, setPosition] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setMobileNo(user.mobileNo);
      setPosition(user.position);
      setUserName(user.userName);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      const updatedUser = {
        firstName,
        lastName,
        email,
        mobileNo,
        position,
        userName,
        password: password ? password : undefined, // Only send password if it's set
      };

      const response = user
        ? await axios.put(`/api/users/${user._id}`, updatedUser) // Update request
        : await axios.post('/api/users/signup', updatedUser); // Create request

      if (response.data.status) {
        if(user){
          toast.success("User updated successfully");
        }else{
          toast.success("User created successfully");
        }
        onRequestClose(); // Close modal
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles.modalContent}
      overlayClassName={styles.modalOverlay}
      ariaHideApp={false}
    >
      <h2>{user ? "Edit User" : "Add User"}</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        {user && 
        
          <div className={styles.type1}>
            <input type="text" value={user?.empId || ''} readOnly placeholder='User ID *' />
          </div>
        }

        <div className={styles.name}>
          <div className={styles.type2}>
            <input type="text" value={firstName} required onChange={(e) => setFirstName(e.target.value)} placeholder='First Name *' />
          </div>
          <div className={styles.type2}>
            <input type="text" value={lastName} required onChange={(e) => setLastName(e.target.value)} placeholder='Last Name *' />
          </div>
        </div>

        <div className={styles.thirdRow}>
          <div className={styles.type3}>
            <input type="email" value={email} required onChange={(e) => setEmail(e.target.value)} placeholder='Email ID *' />
          </div>

          <div className={styles.type3}>
            <input type="tel" value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} placeholder='Mobile No' />
          </div>

          <select className={styles.type3} value={position} onChange={(e) => setPosition(e.target.value)}>
            <option value="">Select Role Type</option>
            <option value="Employee">Employee</option>
            <option value="Admin">Admin</option>
            <option value="HR Admin">HR Admin</option>
            <option value="Super Admin">Super Admin</option>
          </select>
        </div>

        <div className={styles.fourthRow}>
          <div className={styles.type3}>
            <input type="text" value={userName} required onChange={(e) => setUserName(e.target.value)} placeholder='Username *' />
          </div>
          <div className={styles.type3}>
            <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder='Password *' />
          </div>
          <div className={styles.type3}>
            <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Confirm Password *' />
          </div>
        </div>

              <table>
           <thead>
             <tr>
               <th>Module Permission</th>
               <th>Read</th>
               <th>Write</th>
               <th>Delete</th>
             </tr>
           </thead>
           <tbody>
             <tr>
               <td>Super Admin</td>
               <td>
                 <ImCheckboxChecked />
               </td>
               <td>
                 <ImCheckboxChecked />
               </td>
               <td>
                 <ImCheckboxChecked />
               </td>
             </tr>
             <tr>
               <td>Admin</td>
               <td>
                 <ImCheckboxChecked />
               </td>
               <td>
                 <ImCheckboxUnchecked />
               </td>
               <td>
                 <ImCheckboxUnchecked />
               </td>
             </tr>
             <tr>
               <td>Employee</td>
               <td>
                 <ImCheckboxChecked />
               </td>
               <td>
                 <ImCheckboxUnchecked />
               </td>
               <td>
                 <ImCheckboxUnchecked />
               </td>
             </tr>
             <tr>
               <td>Lorem Ipsum</td>
               <td>
                 <ImCheckboxChecked />
               </td>
               <td>
                 <ImCheckboxChecked />
               </td>
               <td>
                 <ImCheckboxChecked />
               </td>
             </tr>
           </tbody>
         </table>

        <button type="submit" className={styles.addButton}>{user ? "Update User" : "Add User"}</button>
      </form>
    </Modal>
  );
};

export default AddUserModal;


// import React, { useState } from 'react';
// import Modal from 'react-modal';
// import styles from './styles/AddUserModal.module.css';
// import { ImCheckboxChecked } from "react-icons/im";
// import { ImCheckboxUnchecked } from "react-icons/im";
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { ToastContainer } from 'react-toastify';

// const AddUserModal = ({ isOpen, onRequestClose }) => {
//   const [userId, setUserId] = useState('');
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [mobileNo, setMobileNo] = useState('');
//   const [position, setPosition] = useState('Employee');
//   const [userName, setUserName] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (password !== confirmPassword) {
//       toast.error("Passwords do not match!");
//       return;
//     }

//     try {
//       const response = await axios.post('/api/users/signup', {
//         // empId: userId,
//         firstName,
//         lastName,
//         email,
//         mobileNo,
//         position,
//         userName,
//         password,
//       });
//       toast.success("User added successfully!");
//       onRequestClose(); // Close the modal
//     } catch (error) {
//       console.error('Error adding user: ', error);
//       toast.error("Error adding user: " + error.response?.data?.message || "Something went wrong!");
//     }
//   };

//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={onRequestClose}
//       className={styles.modalContent}
//       overlayClassName={styles.modalOverlay}
//       ariaHideApp={false}
//     >
//       <ToastContainer />
//       <h2>Add User</h2>
//       <form className={styles.form} onSubmit={handleSubmit}>
//         {/* <div className={styles.type1}>
//           <input
//             type="text"
//             required
//             placeholder='User ID *'
//             value={userId}
//             onChange={(e) => setUserId(e.target.value)}
//           />
//         </div> */}

//         <div className={styles.name}>
//           <div className={styles.type2}>
//             <input
//               type="text"
//               required
//               placeholder='First Name *'
//               value={firstName}
//               onChange={(e) => setFirstName(e.target.value)}
//             />
//           </div>
//           <div className={styles.type2}>
//             <input
//               type="text"
//               required
//               placeholder='Last Name *'
//               value={lastName}
//               onChange={(e) => setLastName(e.target.value)}
//             />
//           </div>
//         </div>

//         <div className={styles.thirdRow}>
//           <div className={styles.type3}>
//             <input
//               type="email"
//               required
//               placeholder='Email ID *'
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>

//           <div className={styles.type3}>
//             <input
//               type="tel"
//               placeholder='Mobile No'
//               value={mobileNo}
//               onChange={(e) => setMobileNo(e.target.value)}
//             />
//           </div>

//           <select
//             className={styles.type3}
//             value={position}
//             onChange={(e) => setPosition(e.target.value)}
//           >
//             <option value="Employee">Employee</option>
//             <option value="Admin">Admin</option>
//             <option value="HR Admin">HR Admin</option>
//             <option value="Super Admin">Super Admin</option>
//           </select>
//         </div>

//         <div className={styles.fourthRow}>
//           <div className={styles.type3}>
//             <input
//               type="text"
//               required
//               placeholder='Username *'
//               value={userName}
//               onChange={(e) => setUserName(e.target.value)}
//             />
//           </div>
//           <div className={styles.type3}>
//             <input
//               type="password"
//               required
//               placeholder='Password *'
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//           <div className={styles.type3}>
//             <input
//               type="password"
//               required
//               placeholder='Confirm Password *'
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//             />
//           </div>
//         </div>

//         <table>
//           <thead>
//             <tr>
//               <th>Module Permission</th>
//               <th>Read</th>
//               <th>Write</th>
//               <th>Delete</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>Super Admin</td>
//               <td>
//                 <ImCheckboxChecked />
//               </td>
//               <td>
//                 <ImCheckboxChecked />
//               </td>
//               <td>
//                 <ImCheckboxChecked />
//               </td>
//             </tr>
//             <tr>
//               <td>Admin</td>
//               <td>
//                 <ImCheckboxChecked />
//               </td>
//               <td>
//                 <ImCheckboxUnchecked />
//               </td>
//               <td>
//                 <ImCheckboxUnchecked />
//               </td>
//             </tr>
//             <tr>
//               <td>Employee</td>
//               <td>
//                 <ImCheckboxChecked />
//               </td>
//               <td>
//                 <ImCheckboxUnchecked />
//               </td>
//               <td>
//                 <ImCheckboxUnchecked />
//               </td>
//             </tr>
//             <tr>
//               <td>Lorem Ipsum</td>
//               <td>
//                 <ImCheckboxChecked />
//               </td>
//               <td>
//                 <ImCheckboxChecked />
//               </td>
//               <td>
//                 <ImCheckboxChecked />
//               </td>
//             </tr>
//           </tbody>
//         </table>
//         <button type="submit" className={styles.addButton}>Add User</button>
//       </form>
//     </Modal>
//   );
// };

// export default AddUserModal;
