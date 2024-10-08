import React from 'react';
import Modal from 'react-modal';
import styles from './styles/AddUserModal.module.css'; // Update the path if necessary
import { ImCheckboxChecked } from "react-icons/im";
import { ImCheckboxUnchecked } from "react-icons/im";

const AddUserModal = ({ isOpen, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles.modalContent}
      overlayClassName={styles.modalOverlay}
      ariaHideApp={false}
    >
      <h2>Add User</h2>
      <form className={styles.form}>
        <div className={styles.type1}>
          <input type="text" required placeholder='User ID *' />
        </div>

        <div className={styles.name}>
          <div className={styles.type2}>
            <input type="text" required placeholder='First Name *' />
          </div>
          <div className={styles.type2}>
            <input type="text" required placeholder='Last Name *' />
          </div>
        </div>

        <div className={styles.thirdRow}>
          <div className={styles.type3}>
            <input type="email" required placeholder='Email ID *' />
          </div>

          <div className={styles.type3}>
            <input type="tel" placeholder='Mobile No' />
          </div>

          <select className={styles.type3} aria-label="Default select example">
            <option selected>Select Role Type</option>
            <option value="Employee">Employee</option>
            <option value="Admin">Admin</option>
            <option value="HR Admin">HR Admin</option>
            <option value="Super Admin">Super Admin</option>
          </select>
        </div>

        <div className={styles.fourthRow}>
          <div className={styles.type3}>
            <input type="text" required placeholder='Username *' />
          </div>
          <div className={styles.type3}>
            <input type="password" required placeholder='Password *' />
          </div>
          <div className={styles.type3}>
            <input type="password" required placeholder='Confirm Password *' />
          </div>
        </div>

        {/* <h3>Module Permission</h3> */}
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
        <button type="submit" className={styles.addButton}>Add User</button>
      </form>
    </Modal>
  );
};

export default AddUserModal;
// const AddUserModal = ({ isOpen, onRequestClose }) => {
//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={onRequestClose}
//       className={styles.modalContent}
//       overlayClassName={styles.modalOverlay}
//       ariaHideApp={false}
//     >
//       <h2>Add User</h2>
//       <form className={styles.form}>
//         <div className={styles.type1}>
//           <input type="text" required placeholder='User ID *' />
//         </div>

//         <div className={styles.name}>
//           <div className={styles.type2}>
//             <input type="text" required placeholder='First Name *' />
//           </div>
//           <div className={styles.type2}>
//             <input type="text" required placeholder='Last Name *' />
//           </div>
//         </div>

//         <div className={styles.thirdRow}>
//           <div className={styles.type3}>
//             <input type="email" required placeholder='Email ID *' />
//           </div>

//           <div className={styles.type3}>
//             <input type="tel" placeholder='Mobile No' />
//           </div>

//           <select className={styles.type3} aria-label="Default select example">
//             <option selected>Select Role Type</option>
//             <option value="Employee">Employee</option>
//             <option value="Admin">Admin</option>
//             <option value="HR Admin">HR Admin</option>
//             <option value="Super Admin">Super Admin</option>
//           </select>
//         </div>

//         <div className={styles.fourthRow}>
//           <div className={styles.type3}>
//             <input type="text" required placeholder='Username *' />
//           </div>
//           <div className={styles.type3}>
//             <input type="password" required placeholder='Password *' />
//           </div>
//           <div className={styles.type3}>
//             <input type="password" required placeholder='Confirm Password *' />
//           </div>
//         </div>

//         <h3>Module Permission</h3>
//         <table>
//           <thead>
//             <tr>
//               <th>Module</th>
//               <th>Read</th>
//               <th>Write</th>
//               <th>Delete</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>Super Admin</td>
//               <td>
//                 <label className={styles.checkboxLabel}>
//                   <input type="checkbox" checked disabled />
//                   <span className={styles.customCheckbox}></span>
//                 </label>
//               </td>
//               <td>
//                 <label className={styles.checkboxLabel}>
//                   <input type="checkbox" checked disabled />
//                   <span className={styles.customCheckbox}></span>
//                 </label>
//               </td>
//               <td>
//                 <label className={styles.checkboxLabel}>
//                   <input type="checkbox" checked disabled />
//                   <span className={styles.customCheckbox}></span>
//                 </label>
//               </td>
//             </tr>
//             <tr>
//               <td>Admin</td>
//               <td>
//                 <label className={styles.checkboxLabel}>
//                   <input type="checkbox" checked disabled />
//                   <span className={styles.customCheckbox}></span>
//                 </label>
//               </td>
//               <td>
//                 <label className={styles.checkboxLabel}>
//                   <input type="checkbox" />
//                   <span className={styles.customCheckbox}></span>
//                 </label>
//               </td>
//               <td>
//                 <label className={styles.checkboxLabel}>
//                   <input type="checkbox" />
//                   <span className={styles.customCheckbox}></span>
//                 </label>
//               </td>
//             </tr>
//             <tr>
//               <td>Employee</td>
//               <td>
//                 <label className={styles.checkboxLabel}>
//                   <input type="checkbox" checked disabled />
//                   <span className={styles.customCheckbox}></span>
//                 </label>
//               </td>
//               <td>
//                 <label className={styles.checkboxLabel}>
//                   <input type="checkbox" />
//                   <span className={styles.customCheckbox}></span>
//                 </label>
//               </td>
//               <td>
//                 <label className={styles.checkboxLabel}>
//                   <input type="checkbox" />
//                   <span className={styles.customCheckbox}></span>
//                 </label>
//               </td>
//             </tr>
//             <tr>
//               <td>Lorem Ipsum</td>
//               <td>
//                 <label className={styles.checkboxLabel}>
//                   <input type="checkbox" checked disabled />
//                   <span className={styles.customCheckbox}></span>
//                 </label>
//               </td>
//               <td>
//                 <label className={styles.checkboxLabel}>
//                   <input type="checkbox" checked disabled />
//                   <span className={styles.customCheckbox}></span>
//                 </label>
//               </td>
//               <td>
//                 <label className={styles.checkboxLabel}>
//                   <input type="checkbox" checked disabled />
//                   <span className={styles.customCheckbox}></span>
//                 </label>
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
