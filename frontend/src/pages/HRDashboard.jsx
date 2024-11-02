import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GreetingHeader from '../components/GreetingHeader';
import Sidebar from '../components/Sidebar';
import styles from './styles/HRDashboard.module.css';
import { useAuth } from '../context/AuthContext';
import LoginPage from './Login';
import Loading from '../components/Loading';
import HRProgressBar from '../components/ProgressBar';
import CandidateStatistics from '../components/CandidateStatistics';
import RecruiterRating from '../components/RecruiterRating';
import CandidateSource from '../components/CandidateSource';
import AverageVacancyClosingTime from '../components/AverageVacancyClosingTime';
import CandidateFunnel from '../components/CandidateFunnel';
import VacancyClosingTime from '../components/VacancyClosingTime';
import CreateVacancy from '../components/CreateVacancy';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HRDashboard = () => {
    const apiUrl = process.env.REACT_APP_API_BASE_URL;

    const { user, loading } = useAuth();
    const [totalResponses, setTotalResponses] = useState(0);
    const [responsesToday, setResponsesToday] = useState(0);
    const [totalVacancies, setTotalVacancies] = useState(0);
    const [closedVacancies, setClosedVacancies] = useState(0);
    const [recruitmentPlan, setRecruitmentPlan] = useState(0);
    const [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        if (user) {
            fetchDashboardData();
        }
    }, [user]);

    const fetchDashboardData = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/vacancies/`); // Fetch HR dashboard data
            const data = response.data;

            const candidatesResponse = await axios.get('/api/candidates/');

            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const responsesToday = candidatesResponse.data.filter((resp)=>{
                const responseDate = new Date(resp.appliedDate);
                responseDate.setHours(0, 0, 0, 0); // Also set the response date time to the start of the day
                return responseDate.getTime() === today.getTime();
            });

            const openVacancies = response.data.filter((resp)=>{
                return resp.status==="open"
            });

            const closedVacancies = response.data.filter((resp)=>{
                return resp.status==='closed'
            })

            setTotalResponses(candidatesResponse.data.length);
            setResponsesToday(responsesToday.length);
            setTotalVacancies(data.length);
            setClosedVacancies(closedVacancies.length);
            setRecruitmentPlan(openVacancies.length);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        }
    };

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    if (loading) {
        return <Loading />;
    }

    if (!user || user.position !== 'HR Admin') {
        return <LoginPage />;
    }

    return (
        <div className={styles.dashboard}>
            <ToastContainer/>
            <Sidebar activeComponent={'dashboard'} />
            <div className={styles.content}>
                <header className={styles.header}>
                    <GreetingHeader username={user.firstName} />
                </header>
                <div className={styles.mainSection}>
                    <div className={styles.create}>
                         <button onClick={handleOpenModal} className={styles.createVacancyButton}>Create New Vacancy</button>
                    </div>
                {isModalOpen && <CreateVacancy onClose={handleCloseModal} />}
                    <div className={styles.statsOverview}>
                        <div className={styles.statCard}>
                            <h3>Total Responses</h3>
                            <p>{totalResponses}</p>
                            {/* <span className={styles.increase}>+15%</span> */}
                        </div>
                        <div className={styles.statCard}>
                            <h3>Responses Today</h3>
                            <p>{responsesToday}</p>
                            {/* <span className={styles.decrease}>-10%</span> */}
                        </div>
                        <div className={styles.statCard}>
                            <h3>Total Vacancies</h3>
                            <p>{totalVacancies}</p>
                        </div>
                        <div className={styles.statCard}>
                            <h3>Closed Vacancies</h3>
                            <p>{closedVacancies} out of {totalVacancies}</p>
                            <div className={styles.progressBar}>
                                <div style={{ width: `${(closedVacancies / totalVacancies) * 100}%` }} className={styles.progressFill}></div>
                            </div>
                        </div>
                        <div className={styles.statCard}>
                            <h3>Recruitment Plan</h3>
                            <p>{recruitmentPlan} out of {totalResponses}</p>
                            <div className={styles.progressBar}>
                                <div style={{ width: `${(recruitmentPlan / totalResponses) * 100}%` }} className={styles.progressFill}></div>
                            </div>
                        </div>
                    </div>
                    {/* <CandidateStatistics /> */}
                    <CandidateStatistics/>
                    <CandidateSource />
                    <RecruiterRating />
                    <AverageVacancyClosingTime/>
                    <CandidateFunnel />
                    <VacancyClosingTime />
                    {/* <HRProgressBar /> */}
                </div>
            </div>
        </div>
    );
}

export default HRDashboard;
