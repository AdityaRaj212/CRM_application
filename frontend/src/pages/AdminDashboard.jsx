import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import GreetingHeader from '../components/GreetingHeader';
import UserList from '../components/UserList';
import AddUserModal from '../components/AddUserModal';
import SortDropdown from '../components/SortDropdown';
import FilterDropdown from '../components/FilterDropdown';
import styles from './styles/AdminDashboard.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import LoginPage from './Login';
import Loading from '../components/Loading';

const AdminDashboard = () => {
  const {loading, user} = useAuth();
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState('User');
  const [loading2, setLoading2] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [positionFilter, setPositionFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1); 
  const [usersPerPage] = useState(5); 
  const [sortOption, setSortOption] = useState('name');
  const [filteredUsers, setFilteredUsers] = useState([]); 

    useEffect(()=>{
      if(!loading && user){
        setUserName(user.firstName);
      }
    },[loading, user]);

    useEffect(() => {
      const fetchDetails = async () => {
        try {             
          const response = await axios.get('/api/users'); 
          setUsers(response.data.users); 
          setFilteredUsers(response.data.users); 
        } catch (err) {
          console.error('Error while fetching user details:', err);
        } finally {
          setLoading2(false); 
        }
      };
      
      fetchDetails();
    },[]);

   const handleSortChange = (option) => {
    setSortOption(option);
    sortUsers(option);
  };

  const sortUsers = (option) => {
    const sortedUsers = [...filteredUsers].sort((a, b) => {
      if (option === 'firstName') {
        return a.firstName.localeCompare(b.firstName);
      } else if (option === 'joiningDate') {
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

  const indexOfLastUser = currentPage * usersPerPage; 
  const indexOfFirstUser = indexOfLastUser - usersPerPage; 
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser); 

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
    setCurrentPage(1); 
  };

  const handlePositionFilterChange = (position) => {
    setPositionFilter(position);
    
    if (position) {
      const filtered = users.filter(user => user.position === position);
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users); 
    }
    setCurrentPage(1); 
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
      setUsers(users.filter(user => user._id !== userId)); 
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Unable to delete user. Something went wrong');
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading || loading2) {
    return <Loading/>
  }

  if((!user || (user && user.position==='Employee'))){
    return <LoginPage/>
  }

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage); 

  return (
    <div className={styles.dashboard}>
      <Sidebar activeComponent={'dashboard'}/>
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

      <AddUserModal isOpen={isModalOpen} onRequestClose={closeModal} />
      <ToastContainer />
    </div>
  );
};

export default AdminDashboard;
