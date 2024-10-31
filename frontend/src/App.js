import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import './App.css';  // Import global styles
import AdminDashboard from './pages/AdminDashboard';
import Users from './pages/Users';
import Documents from './pages/Documents';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import Hierarchy from './pages/Hierarchy';
import Help from './pages/Help';
import Settings from './pages/Settings';
import PasswordChange from './components/PasswordChange';
// import Login2 from './pages/Login2.tsx';
import NotFound from './components/NotFound.jsx';
import HRDashboard from './pages/HRDashboard.jsx';
import Login3 from './pages/Login3.jsx';
import ChatContainer from './pages/ChatContainer.jsx';
import Payroll from './pages/Payroll.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
      {/* <ToastContainer/> */}
        <Routes>
          {/* <Route path='/auth' element = {<Login2/>} /> */}
          <Route path='/auth' element = {<Login/>} />
          <Route path='/auth3' element = {<Login3/>} />
          <Route path='/' element={<Dashboard/>} />
          <Route path='/admin' element = {<AdminDashboard/>} />
          <Route path='/hr' element = {<HRDashboard/>} />
          <Route path='/users' element = {<Users/>} />
          <Route path='/documents' element = {<Documents/>} />
          <Route path='/payroll' element = {<Payroll/>} />
          <Route path='/hierarchy' element = {<Hierarchy/>} />
          <Route path='/help' element = {<Help/>} />
          <Route path='/settings' element = {<Settings/>} />
          <Route path='/change-password' element = {<PasswordChange/>} />
          <Route path='/chat' element = {<ChatContainer/>} />
          <Route path='*' element={<NotFound/>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
