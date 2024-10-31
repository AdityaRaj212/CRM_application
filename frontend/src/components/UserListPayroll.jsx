// UserList.jsx
import React, { useState } from 'react';
import { format } from 'date-fns';
import styles from './styles/UserList.module.css';
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import AddUserModal from './AddUserModal'; // Import the AddUserModal
import { ToastContainer } from 'react-toastify';

const UserListPayroll = ({ users, onDeleteUser, onUpdateUser }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // State to hold user being edited

  const handleEdit = (user) => {
    setCurrentUser(user); 
    setModalOpen(true); 
  };

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      await onDeleteUser(userId); // Call the delete function passed from parent
    }
  };

  const handleUserUpdate = (updatedUser) => {
    setModalOpen(false);
    onUpdateUser(updatedUser); // Notify the parent component of the update
  };

  return (
    <div className={styles.container}>
      <ToastContainer />
      <div className={styles.header}>List Users</div>
      <table className={styles.userTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Issue Date</th>
            <th>Role</th>
            {/* <th>Action</th> */}
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td className={styles.user}>
                <div className={styles.userInfo}>
                  <div>
                    {user.firstName} {user.lastName}
                  </div>
                  <div className={styles.userEmail}>
                    {user.email}
                  </div>
                </div>
                <div className={styles.admin}>
                  View Statement
                </div>
                {/* <div className={user.position === 'Employee' ? styles.employee : styles.admin}>
                  {user.position}
                </div> */}
              </td>
              <td>{format(new Date(user.joiningDate), 'dd MMM, yyyy')}</td>
              <td>{user.role}</td>
              {/* <td className={styles.actionBtns}>
                <button onClick={() => handleEdit(user)}><CiEdit /></button>
                <button onClick={() => handleDelete(user._id)}><RiDeleteBin6Line /></button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit User Modal */}
      {isModalOpen && (
        <AddUserModal
          isOpen={isModalOpen}
          onRequestClose={() => setModalOpen(false)}
          user={currentUser} // Pass the user details to the modal for editing
          onUpdateUser={handleUserUpdate} // Handle user update
        />
      )}
    </div>
  );
};

export default UserListPayroll;
