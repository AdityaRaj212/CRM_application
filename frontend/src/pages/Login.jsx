import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toast notifications
import styles from './styles/Login.module.css';

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
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userId', res.data.userId);
            window.location.href = '/dashboard';
        } catch (error) {
            console.error('Google OAuth Error:', error);
            toast.error('Google login failed. Please try again.'); // Show error toast
        }
    };

    // Handle Google Login Failure
    const handleGoogleFailure = (response) => {
        console.error('Google OAuth Failure:', response);
        toast.error('Google login failed. Please try again.'); // Show error toast
    };

    // Handle Local Login
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/users/login', { email, password });
            console.log('Login Success:', res.data);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userId', res.data.userId);
            window.location.href = '/';
        } catch (error) {
            console.error('Login Error:', error);
            toast.error('Invalid email or password. Please try again.'); // Show error toast
        }
    };

    // Handle Signup
    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/users/signup', { name, email, password });
            console.log('Signup Success:', res.data);
            localStorage.setItem('token', res.data.token);
            setIsSignup(false);
        } catch (error) {
            console.error('Signup Error:', error);
            toast.error('Signup failed. Please check your details and try again.'); // Show error toast
        }
    };

    // Toggle between login and signup
    const toggleAuthMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
    };

    return (
        <div className={styles.pageContainer}>
            <ToastContainer /> {/* Toast notifications container */}
            <div className={styles.formWrapper}>
                <h1 className={styles.companyName}>Prajnan</h1>
                <div className={styles.formHeader}>
                    <h2>{isSignup ? 'Create Your Account' : 'Welcome Back!'}</h2>
                    <p>{isSignup ? 'Get started with us today.' : 'Login to your account'}</p>
                </div>
                {isSignup ? (
                    <form onSubmit={handleSignup} className={styles.form}>
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className={styles.input}
                        />
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className={styles.input}
                        />
                        <input
                            type="password"
                            placeholder="Create Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className={styles.input}
                        />
                        <button type="submit" className={styles.submitButton}>Create Account</button>
                    </form>
                ) : (
                    <form onSubmit={handleLogin} className={styles.form}>
                        <input
                            type="email"
                            placeholder="Email Address"
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
                        <button type="submit" className={styles.submitButton}>Login</button>
                    </form>
                )}

                {/* <div className={styles.authToggle}>
                    <p>{isSignup ? 'Already have an account?' : 'New to CRM?'}</p>
                    <span onClick={toggleAuthMode} className={styles.toggleLink}>
                        {isSignup ? 'Login' : 'Sign Up'}
                    </span>
                </div> */}

                {/* <div className={styles.googleAuth}>
                    <p>Or continue with</p>
                    <GoogleLogin
                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                        buttonText="Login with Google"
                        onSuccess={handleGoogleSuccess}
                        onFailure={handleGoogleFailure}
                        cookiePolicy={'single_host_origin'}
                        className={styles.googleButton}
                    />
                </div> */}
            </div>
        </div>
    );
};

export default LoginPage;



// import React, { useState } from 'react';
// import { GoogleLogin } from 'react-google-login';
// import axios from 'axios';
// import styles from './styles/Login.module.css';
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
//         <div className={styles.loginContainer}>
//             <div className={styles.loginCard}>
//                 <h2>{isSignup ? 'Signup' : 'Login'}</h2>

//                 {isSignup ? (
//                     <form onSubmit={handleSignup} className={styles.form}>
//                         <input
//                             type="text"
//                             placeholder="Name"
//                             value={name}
//                             onChange={(e) => setName(e.target.value)}
//                             required
//                             className={styles.input}
//                         />
//                         <input
//                             type="email"
//                             placeholder="Email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             required
//                             className={styles.input}
//                         />
//                         <input
//                             type="password"
//                             placeholder="Password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                             className={styles.input}
//                         />
//                         <button type="submit" className={styles.button}>Signup</button>
//                     </form>
//                 ) : (
//                     <form onSubmit={handleLogin} className={styles.form}>
//                         <input
//                             type="email"
//                             placeholder="Email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             required
//                             className={styles.input}
//                         />
//                         <input
//                             type="password"
//                             placeholder="Password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                             className={styles.input}
//                         />
//                         <button type="submit" className={styles.button}>Login</button>
//                     </form>
//                 )}

//                 {/* <p className={styles.toggleText}>
//                     {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
//                     <span onClick={toggleAuthMode} className={styles.toggleButton}>
//                         {isSignup ? 'Login' : 'Signup'}
//                     </span>
//                 </p>

//                 <h3>Or login with Google</h3>
//                 <GoogleLogin
//                     clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
//                     buttonText="Login with Google"
//                     onSuccess={handleGoogleSuccess}
//                     onFailure={handleGoogleFailure}
//                     cookiePolicy={'single_host_origin'}
//                     redirectUri="http://localhost:3000/"
//                     className={styles.googleButton}
//                 /> */}
//             </div>
//         </div>
//     );
// };

// export default LoginPage;