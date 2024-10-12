import React from 'react';
import Sidebar from '../components/Sidebar';
import GreetingHeader from '../components/GreetingHeader';
import styles from './styles/Help.module.css';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';

const Help = () => {
    const {loading, user} = useAuth();

    if(loading) return(<Loading/>);

    return (
        <div className={styles.helpContainer}>
            <Sidebar activeComponent={'help'} />
            <div className={styles.content}>
                <GreetingHeader username={user.firstName} />
                <h1 className={styles.title}>Help Center</h1>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Getting Started</h2>
                    <p className={styles.sectionDescription}>
                        Welcome to the CRM application! This help section will guide you through using the key features.
                    </p>
                    <ul className={styles.list}>
                        <li><strong>Dashboard:</strong> Your main hub for quick access to important information.</li>
                        <li><strong>Documents:</strong> Manage and upload documents relevant to your work.</li>
                        <li><strong>Hierarchy:</strong> View the organization structure and your position within it.</li>
                        <li><strong>Settings:</strong> Customize your preferences and account settings.</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Key Features</h2>
                    <h3>Documents Management</h3>
                    <p>Upload, edit, delete, and preview documents easily.</p>
                    <p>How to Upload a Document:</p>
                    <ol>
                        <li>Click the "+" button on the Documents page.</li>
                        <li>Fill in the details, including file name and description.</li>
                        <li>Choose the file you want to upload.</li>
                        <li>Click "Upload" to save the document.</li>
                    </ol>

                    <h3>Organization Hierarchy</h3>
                    <p>Visualize your organization's structure and your position in it. You can expand or collapse sections to view more details.</p>

                    <h3>Sorting and Filtering</h3>
                    <p>Use sorting and filtering options in the Documents section to find specific files based on type, upload date, or search queries.</p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Frequently Asked Questions (FAQs)</h2>
                    <div className={styles.faq}>
                        <h4>Q: How do I reset my password?</h4>
                        <p>A: You can reset your password from the login page by clicking on "Forgot Password."</p>
                    </div>
                    <div className={styles.faq}>
                        <h4>Q: What file formats can I upload?</h4>
                        <p>A: You can upload PDF, JPEG, PNG, DOCX, and XLSX files.</p>
                    </div>
                    <div className={styles.faq}>
                        <h4>Q: Who do I contact for support?</h4>
                        <p>A: For support, contact your HR Admin or reach out to the technical support team via email.</p>
                    </div>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Contact Support</h2>
                    <p>If you need further assistance, please reach out to support at <strong>support@yourcompany.com</strong>.</p>
                </section>
            </div>
        </div>
    );
};

export default Help;
