// import React, { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const navigate = useNavigate(); // Initialize useNavigate here

//     useEffect(() => {
//         // Check if the user is logged in (e.g., check localStorage for token)
//         const token = localStorage.getItem('token');
//         if (token) {
//             axios.get('/api/users/me', {
//                 headers: { Authorization: `Bearer ${token}` }
//             })
//             .then(response => {
//                 setUser(response.data.user);
//                 if (response.data.user.position === 'Employee') {
//                     navigate('/'); // Navigate to home if employee
//                 } else {
//                     navigate('/admin'); // Navigate to admin if admin
//                 }
//             })
//             .catch(() => setUser(null))
//             .finally(() => setLoading(false));
//         } else {
//             setLoading(false);
//         }
//     }, [navigate]); // Add navigate to the dependency array

//     const login = async (username, password) => {
//         const response = await axios.post('/api/login', { username, password });
//         localStorage.setItem('token', response.data.token);
//         setUser(response.data.user);
//         if (response.data.user.position === 'Employee') {
//             navigate('/'); // Navigate to home if employee
//         } else {
//             navigate('/admin'); // Navigate to admin if admin
//         }
//     };

//     const logout = () => {
//         localStorage.removeItem('token');
//         setUser(null);
//         navigate('/auth'); // Navigate to auth page on logout
//     };

//     return (
//         <AuthContext.Provider value={{ user, login, logout, loading }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => useContext(AuthContext);



// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const apiUrl = process.env.REACT_APP_API_BASE_URL;

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if the user is logged in (e.g., check localStorage for token)
        const token = localStorage.getItem('token');
        if (token) {
            axios.get(`${apiUrl}/api/users/me`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(response => {
                setUser(response.data.user)
        })
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (username, password) => {
        const response = await axios.post(`${apiUrl}/api/login`, { username, password });
        localStorage.setItem('token', response.data.token);
        setUser(response.data.user);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
