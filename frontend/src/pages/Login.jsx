import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import styles from './styles/Login.module.css';
import './styles/Login.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState(''); // For signup form
    const [isSignup, setIsSignup] = useState(false); // Switch between login and signup

    // Handle Google Login Success
    const handleGoogleSuccess = async (response) => {
        const tokenId = response.tokenId;
        try {
            const res = await axios.post('/api/users/oauth/google', { tokenId });
            console.log('Google OAuth Success:', res.data);
            // Save the JWT token and redirect to dashboard
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userId', res.data.userId);
            window.location.href = '/dashboard';
        } catch (error) {
            console.error('Google OAuth Error:', error);
        }
    };

    // Handle Google Login Failure
    const handleGoogleFailure = (response) => {
        console.error('Google OAuth Failure:', response);
    };

    // Handle Local Login
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/users/login', { email, password });
            console.log('Login Success:', res.data);
            // Save the JWT token and redirect to dashboard
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userId', res.data.userId);
            window.location.href = '/';
        } catch (error) {
            console.error('Login Error:', error);
        }
    };

    // Handle Signup
    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/users/signup', { name, email, password });
            console.log('Signup Success:', res.data);
            // Save the JWT token and redirect to dashboard
            localStorage.setItem('token', res.data.token);
            // window.location.href = '/dashboard';
            setIsSignup(false);
        } catch (error) {
            console.error('Signup Error:', error);
        }
    };

    // Toggle between login and signup
    const toggleAuthMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginCard}>
                <h2>{isSignup ? 'Signup' : 'Login'}</h2>

                {isSignup ? (
                    <form onSubmit={handleSignup} className={styles.form}>
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className={styles.input}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className={styles.input}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className={styles.input}
                        />
                        <button type="submit" className={styles.button}>Signup</button>
                    </form>
                ) : (
                    <form onSubmit={handleLogin} className={styles.form}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className={styles.input}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className={styles.input}
                        />
                        <button type="submit" className={styles.button}>Login</button>
                    </form>
                )}

                {/* <p className={styles.toggleText}>
                    {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
                    <span onClick={toggleAuthMode} className={styles.toggleButton}>
                        {isSignup ? 'Login' : 'Signup'}
                    </span>
                </p>

                <h3>Or login with Google</h3>
                <GoogleLogin
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    buttonText="Login with Google"
                    onSuccess={handleGoogleSuccess}
                    onFailure={handleGoogleFailure}
                    cookiePolicy={'single_host_origin'}
                    redirectUri="http://localhost:3000/"
                    className={styles.googleButton}
                /> */}
            </div>
        </div>
    );
};

export default LoginPage;


// import React, { useState } from 'react';
// import { GoogleLogin } from 'react-google-login';
// import axios from 'axios';
// import './styles/Login.css';

// const LoginPage = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [name, setName] = useState(''); // For signup form
//     const [isSignup, setIsSignup] = useState(false); // Switch between login and signup

//     // Handle Google Login Success
//     const handleGoogleSuccess = async (response) => {
//         const tokenId = response.tokenId;
//         try {
//             const res = await axios.post('/api/users/oauth/google', { tokenId });
//             console.log('Google OAuth Success:', res.data);
//             // Save the JWT token and redirect to dashboard
//             localStorage.setItem('token', res.data.token);
//             localStorage.setItem('userId', res.data.userId);
//             window.location.href = '/dashboard';
//         } catch (error) {
//             console.error('Google OAuth Error:', error);
//         }
//     };

//     // Handle Google Login Failure
//     const handleGoogleFailure = (response) => {
//         console.error('Google OAuth Failure:', response);
//     };

//     // Handle Local Login
//     const handleLogin = async (e) => {
//         e.preventDefault();
//         try {
//             const res = await axios.post('/api/users/login', { email, password });
//             console.log('Login Success:', res.data);
//             // Save the JWT token and redirect to dashboard
//             localStorage.setItem('token', res.data.token);
//             localStorage.setItem('userId', res.data.userId);
//             window.location.href = '/';
//         } catch (error) {
//             console.error('Login Error:', error);
//         }
//     };

//     // Handle Signup
//     const handleSignup = async (e) => {
//         e.preventDefault();
//         try {
//             const res = await axios.post('/api/users/signup', { name, email, password });
//             console.log('Signup Success:', res.data);
//             // Save the JWT token and redirect to dashboard
//             localStorage.setItem('token', res.data.token);
//             // window.location.href = '/dashboard';
//             setIsSignup(false);
//         } catch (error) {
//             console.error('Signup Error:', error);
//         }
//     };

//     // Toggle between login and signup
//     const toggleAuthMode = () => {
//         setIsSignup((prevIsSignup) => !prevIsSignup);
//     };

//     return (
//         <div className="login-page">
//             <h2>{isSignup ? 'Signup' : 'Login'}</h2>

//             {isSignup ? (
//                 <form onSubmit={handleSignup}>
//                     <input
//                         type="text"
//                         placeholder="Name"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         required
//                     />
//                     <input
//                         type="email"
//                         placeholder="Email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                     />
//                     <input
//                         type="password"
//                         placeholder="Password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />
//                     <button type="submit">Signup</button>
//                 </form>
//             ) : (
//                 <form onSubmit={handleLogin}>
//                     <input
//                         type="email"
//                         placeholder="Email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                     />
//                     <input
//                         type="password"
//                         placeholder="Password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />
//                     <button type="submit">Login</button>
//                 </form>
//             )}

//             <p>
//                 {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
//                 <button onClick={toggleAuthMode}>
//                     {isSignup ? 'Login' : 'Signup'}
//                 </button>
//             </p>

//             <h2>Or login with Google</h2>
//             <GoogleLogin
//                 clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
//                 buttonText="Login with Google"
//                 onSuccess={handleGoogleSuccess}
//                 onFailure={handleGoogleFailure}
//                 cookiePolicy={'single_host_origin'}
//                 redirectUri="http://localhost:3000/"
//                 className="google-login-btn"
//                 render={renderProps => (
//                     <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="google-login-btn">
//                         <img src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png" alt="Google" />
//                         Login with Google
//                     </button>
//                     )}
//             />

//         </div>
//     );
// };

// export default LoginPage;
