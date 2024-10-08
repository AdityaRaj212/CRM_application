// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Sidebar from '../components/Sidebar';
// import GreetingHeader from '../components/GreetingHeader';
// import UserList from '../components/UserList';
// import styles from './styles/AdminDashboard.module.css';
// import SortDropdown from '../components/SortDropdown';
// import AddUserModal from '../components/AddUserModal';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { ToastContainer } from 'react-toastify';


// const AdminDashboard = () => {
//   const [users, setUsers] = useState([]);
//   const [userName, setUserName] = useState('User');
//   const [loading, setLoading] = useState(true);
//   const [sortOption, setSortOption] = useState('name');

//   const handleSortChange = (option) => {
//     setSortOption(option);
//     sortUsers(option);
//   };

//     const sortUsers = (option) => {
//     const sortedUsers = [...users].sort((a, b) => {
//       if (option === 'name') {
//         return a.name.localeCompare(b.name);
//       } else if (option === 'createDate') {
//         return new Date(a.createDate) - new Date(b.createDate);
//       } else if (option === 'role') {
//         return a.role.localeCompare(b.role);
//       }
//       return 0;
//     });
//     setUsers(sortedUsers);
//   };

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get('/api/users'); // Modify the endpoint accordingly
//         setUsers(response.data.users); // Adjust according to your API response structure
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   // Function to handle user deletion
//   const handleDeleteUser = async (userId) => {
//     try {
//       console.log(userId);
//       await axios.delete(`/api/users/${userId}`); // Make sure the endpoint is correct
//       toast.success('User deleted successfully')
//       setUsers(users.filter(user => user.id !== userId)); // Remove the user from the local state
//     } catch (error) {
//       console.error('Error deleting user:', error);
//       toast.error('Unable to delete user. Something went wrong');
//     }
//   };

//   if (loading) {
//     return <div className={styles.loading}>Loading...</div>;
//   }

//   return (
//     <div className={styles.dashboard}>
//       <ToastContainer/>
//       <Sidebar />
//       <div className={styles.content}>
//         <header className={styles.header}>
//           <GreetingHeader username={userName} />
//         </header>

//         <div className={styles.mainSection}>
//           <div className={styles.headerSection}>
//             <div>
//               <h2 className={styles.sectionTitle}>Users Dashboard</h2>
//             </div>
//             <div className={styles.quickActions}>
//               <input type="text" placeholder="Search" />
//               <button onClick={openModal} className={styles.addUserButton}>Add user +</button>
//               <SortDropdown onSortChange={handleSortChange} />
//             </div>
//           </div>
//           <UserList users={users} onDeleteUser={handleDeleteUser} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import GreetingHeader from '../components/GreetingHeader';
import UserList from '../components/UserList';
import AddUserModal from '../components/AddUserModal'; // Import the modal component
import styles from './styles/AdminDashboard.module.css';
import SortDropdown from '../components/SortDropdown';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState('User');
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState('name');
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users'); // Modify the endpoint accordingly
        setUsers(response.data.users); // Adjust according to your API response structure
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Function to handle sorting
  const handleSortChange = (option) => {
    setSortOption(option);
    sortUsers(option);
  };

  // Function to sort users based on selected option
  const sortUsers = (option) => {
    const sortedUsers = [...users].sort((a, b) => {
      if (option === 'name') {
        return a.name.localeCompare(b.name);
      } else if (option === 'createDate') {
        return new Date(a.createDate) - new Date(b.createDate);
      } else if (option === 'role') {
        return a.role.localeCompare(b.role);
      }
      return 0;
    });
    setUsers(sortedUsers);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

const handleDeleteUser = async (userId) => {
  try {
    console.log(userId);
    await axios.delete(`/api/users/${userId}`); // Make sure the endpoint is correct
    toast.success('User deleted successfully')
    setUsers(users.filter(user => user.id !== userId)); // Remove the user from the local state
  } catch (error) {
    console.error('Error deleting user:', error);
    toast.error('Unable to delete user. Something went wrong');
  }
};

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.dashboard}>
      <Sidebar />
      <div className={styles.content}>
        <header className={styles.header}>
          <GreetingHeader username={userName} />
        </header>

        <div className={styles.mainSection}>
          <div className={styles.headerSection}>
            <div>
              <h2 className={styles.sectionTitle}>Users Dashboard</h2>
            </div>
            <div className={styles.quickActions}>
              <input type="text" placeholder="Search" />
              <button onClick={openModal} className={styles.addUserButton}>Add user +</button>
              <SortDropdown onSortChange={handleSortChange} />
            </div>
          </div>
          <UserList users={users} onDeleteUser={handleDeleteUser} />
        </div>
      </div>

      {/* Add User Modal */}
      <AddUserModal isOpen={isModalOpen} onRequestClose={closeModal} />
    </div>
  );
};

export default AdminDashboard;
