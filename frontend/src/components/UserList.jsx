// UserList.jsx
import React from 'react';
import { format } from 'date-fns';
import styles from './styles/UserList.module.css';

import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";

const UserList = ({ users }) => {
  // const formattedDate = format(new Date(user.joiningDate), 'dd MMM, yyyy');
  // console.log(formattedDate); // Output: 28 Sep, 2024

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        List Users
      </div>
      <table className={styles.userTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Create Date</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td className={styles.user}>
                <div className={styles.userInfo}>
                  <div>
                    {user.name}
                  </div>
                  <div className={styles.userEmail}>
                    {user.email}
                  </div>
                </div>
                <div className={user.position==='Employee' ? styles.employee : styles.admin}>
                  {user.position}
                </div>
                {/* <div className={styles.userType}>
                  {user.position}
                </div> */}
              </td>
              <td>{format(new Date(user.joiningDate), 'dd MMM, yyyy')}</td>
              <td>{user.role}</td>
              <td className={styles.actionBtns}>  
                <button><CiEdit /></button>
                <button><RiDeleteBin6Line /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
