import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import GreetingHeader from '../components/GreetingHeader';
import UserList from '../components/UserList';
import AddUserModal from '../components/AddUserModal'; // Import the modal component
import SortDropdown from '../components/SortDropdown';
import FilterDropdown from '../components/FilterDropdown'; // Import the FilterDropdown
import styles from './styles/AdminDashboard.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState('User');
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState('name');
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [filteredUsers, setFilteredUsers] = useState([]); // State for filtered users
  const [positionFilter, setPositionFilter] = useState(''); // State for position filter

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users'); // Modify the endpoint accordingly
        setUsers(response.data.users); // Adjust according to your API response structure
        setFilteredUsers(response.data.users); // Initialize filtered users
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
    const sortedUsers = [...filteredUsers].sort((a, b) => {
      if (option === 'firstName') {
        return a.firstName.localeCompare(b.firstName);
      } else if (option === 'joiningDate') {
        console.log(a.joiningDate);
        console.log(b.joiningDate);
        return new Date(a.joiningDate) - new Date(b.joiningDate);
      } else if (option === 'role') {
        return a.position.localeCompare(b.position);
      }
      return 0;
    });
    setFilteredUsers(sortedUsers);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    const results = users.filter(user =>
      user.firstName.toLowerCase().includes(query) ||
      user.lastName.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.joiningDate.includes(query) ||
      user.position.toLowerCase().includes(query) ||
      user.role.toLowerCase().includes(query)
    );

    setFilteredUsers(results); // Set filtered users based on search query
  };

  const handlePositionFilterChange = (position) => {
    setPositionFilter(position);
    
    if (position) {
      const filtered = users.filter(user => user.position === position);
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users); // Reset to all users if no filter is selected
    }
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
      setFilteredUsers(filteredUsers.filter(user => user._id !== userId)); // Remove the user from the local state
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
              <input 
                type="text" 
                placeholder="Search" 
                value={searchQuery} 
                onChange={handleSearchChange} 
              />
              <button onClick={openModal} className={styles.addUserButton}>Add user +</button>
              <SortDropdown onSortChange={handleSortChange} />
              <FilterDropdown 
                onFilterChange={handlePositionFilterChange} 
                selectedPosition={positionFilter} 
              />
            </div>
          </div>
          <UserList users={filteredUsers} onDeleteUser={handleDeleteUser} />
        </div>
      </div>

      {/* Add User Modal */}
      <AddUserModal isOpen={isModalOpen} onRequestClose={closeModal} />
    </div>
  );
};

export default AdminDashboard;
