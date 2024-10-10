import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import GreetingHeader from '../components/GreetingHeader';
import UserList from '../components/UserList';
import AddUserModal from '../components/AddUserModal';
import SortDropdown from '../components/SortDropdown';
import FilterDropdown from '../components/FilterDropdown';
import styles from './styles/Users.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const Users = () => {
  const [user, setUser] = useState('');
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState('User');
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [positionFilter, setPositionFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [usersPerPage] = useState(5); // Number of users per page
  const [sortOption, setSortOption] = useState('name');
  const [filteredUsers, setFilteredUsers] = useState([]); // State for filtered users
  const [loremNumbers, setLoremNumbers] = useState([614, 124, 504, 100]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
          const userResponse = await axios.get(`/api/users/get-user-by-id/${storedUserId}`);
          setUser(userResponse.data.user);
          setUserName(userResponse.data.user.firstName);
        }

        const response = await axios.get('/api/users'); // Adjust this endpoint
        setUsers(response.data.users); // Set users from API response
        setFilteredUsers(response.data.users); // Initialize filtered users
      } catch (err) {
        console.error('Error while fetching user details:', err);
      } finally {
        setLoading(false); // Once the fetch is complete, set loading to false
      }
    };
    
    fetchDetails();
  },[]);

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

  const results = users.filter(user => 
    user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage; // Last user index on current page
  const indexOfFirstUser = indexOfLastUser - usersPerPage; // First user index on current page
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser); // Get users for the current page

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

    setFilteredUsers(results);
    setCurrentPage(1); // Reset to first page on search
  };

  const handlePositionFilterChange = (position) => {
    setPositionFilter(position);
    
    if (position) {
      const filtered = users.filter(user => user.position === position);
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users); // Reset to all users if no filter is selected
    }
    setCurrentPage(1); // Reset to first page on filter change
  };

  const openModal = () => {
    setCurrentUser(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`/api/users/${userId}`);
      toast.success('User deleted successfully');
      setUsers(users.filter(user => user._id !== userId)); // Remove the user from the local state
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Unable to delete user. Something went wrong');
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage); // Calculate total pages

  return (
    <div className={styles.dashboard}>
      <Sidebar activeComponent={'users'}/>
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
            <div className={styles.loremSection}>
              {loremNumbers.map((number, index) => (
                <div className={styles.loremItem} key={index}>
                  <div className={styles.text}>
                   Lorem ipsum
                  </div>
                  <div className={styles.number}>
                   {number}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <UserList users={currentUsers} onDeleteUser={handleDeleteUser} />
          <div className={styles.pagination}>
            {Array.from({ length: totalPages }, (_, index) => (
              <button 
                key={index + 1} 
                onClick={() => handlePageChange(index + 1)} 
                className={currentPage === index + 1 ? styles.active : ''}>
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      <AddUserModal isOpen={isModalOpen} onRequestClose={closeModal} />
      <ToastContainer />
    </div>
  );
};

export default Users;
