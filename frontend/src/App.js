import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import './App.css';  // Import global styles
import AdminDashboard from './pages/AdminDashboard';
import Users from './pages/Users';
import Documents from './pages/Documents';

function App() {
  // const [tasks, setTasks] = useState([]);

  // useEffect(() => {
  //   // Fetch tasks from the backend
  //   axios.get('/api/tasks')
  //     .then(response => setTasks(response.data))
  //     .catch(error => console.log(error));
  // }, []);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Dashboard/>} />
        <Route path='/auth' element = {<Login/>} />
        <Route path='/admin' element = {<AdminDashboard/>} />
        <Route path='/users' element = {<Users/>} />
        <Route path='/documents' element = {<Documents/>} />
      </Routes>
    </Router>
    // <div className="App">
    //   <Dashboard tasks={tasks} />
    // </div>
  );
}

export default App;
