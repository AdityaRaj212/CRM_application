import React, { useState } from 'react';
import styles from './styles/PasswordChangeModal.module.css';
import { FaLock } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const PasswordChangeModal = ({ closeModal }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordStrength, setPasswordStrength] = useState('');

    // Function to calculate password strength
    const calculateStrength = (password) => {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;

        if (strength === 1) return { text: 'Weak', color: 'red' };
        if (strength === 2) return { text: 'Medium', color: 'orange' };
        if (strength >= 3) return { text: 'Strong', color: 'green' };

        return { text: 'Very Weak', color: 'darkred' };
    };

    const handlePasswordChange = (e) => {
        setNewPassword(e.target.value);
        const strength = calculateStrength(e.target.value);
        setPasswordStrength(strength);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            toast.error('New passwords do not match!');
            return;
        }

        try {
            const response = await axios.put('/api/change-password', {
                currentPassword,
                newPassword,
            });

            if (response.data.success) {
                toast.success('Password changed successfully!');
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
                closeModal();
            }
        } catch (error) {
            toast.error('Error changing password, please try again.');
            console.error('Error changing password:', error);
        }
    };

    return (
        <div className={styles.modalBackground}>
            <div className={styles.modalContainer}>
                <ToastContainer />
                <button className={styles.closeButton} onClick={closeModal}>X</button>
                <h2 className={styles.title}><FaLock /> Change Password</h2>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="currentPassword">Current Password</label>
                        <input
                            type="password"
                            id="currentPassword"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                            className={styles.inputField}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="newPassword">New Password</label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={handlePasswordChange}
                            required
                            className={styles.inputField}
                        />
                        {newPassword && (
                            <p className={styles.strengthIndicator} style={{ color: passwordStrength.color }}>
                                {passwordStrength.text}
                            </p>
                        )}
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className={styles.inputField}
                        />
                    </div>
                    <button type="submit" className={styles.submitButton}>Update Password</button>
                </form>
            </div>
        </div>
    );
};

export default PasswordChangeModal;
