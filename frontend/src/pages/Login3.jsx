import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './styles/Login3.module.css';
import loginImage from './../images/loginImage.png'; 

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isSignup, setIsSignup] = useState(false);

    const handleGoogleSuccess = async (response) => {
        const tokenId = response.tokenId;
        try {
            const res = await axios.post('/api/users/oauth/google', { tokenId });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userId', res.data.userId);
            window.location.href = '/dashboard';
        } catch (error) {
            toast.error('Google login failed. Please try again.');
        }
    };

    const handleGoogleFailure = (response) => {
        toast.error('Google login failed. Please try again.');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/users/login', { email, password });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userId', res.data.userId);
            window.location.href = '/';
        } catch (error) {
            toast.error('Invalid email or password. Please try again.');
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/users/signup', { name, email, password });
            localStorage.setItem('token', res.data.token);
            setIsSignup(false);
        } catch (error) {
            toast.error('Signup failed. Please check your details and try again.');
        }
    };

    const toggleAuthMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
    };

    return (
        <div className={styles.container}>
            <ToastContainer />
            <div className={styles.wrapper}>
                <div className={styles.leftPanel}>
                    <h1 className={styles.title}>Welcome to Prajnan! 👋</h1>
                    <p className={styles.subtitle}>Please sign-in to your account and explore our application.</p>
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
                        <p>{isSignup ? 'Already have an account?' : 'New on our platform?'}</p>
                        <span onClick={toggleAuthMode} className={styles.toggleLink}>
                            {isSignup ? 'Login' : 'Create an account'}
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
                <div className={styles.rightPanel}>
                    <img src={loginImage} alt="Login Illustration" className={styles.image} />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
