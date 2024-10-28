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

const HRDashboard = () => {
    const { user, loading } = useAuth();
    const [totalResponses, setTotalResponses] = useState(0);
    const [responsesToday, setResponsesToday] = useState(0);
    const [totalVacancies, setTotalVacancies] = useState(0);
    const [closedVacancies, setClosedVacancies] = useState(0);
    const [recruitmentPlan, setRecruitmentPlan] = useState(0);

    useEffect(() => {
        if (user) {
            fetchDashboardData();
        }
    }, [user]);

    const fetchDashboardData = async () => {
        try {
            const response = await axios.get('/api/hr-dashboard/'); // Fetch HR dashboard data
            const data = response.data;
            console.log('data:',data);
            setTotalResponses(data.totalResponses);
            setResponsesToday(data.responsesToday);
            setTotalVacancies(data.totalVacancies);
            setClosedVacancies(data.closedVacancies);
            setRecruitmentPlan(data.recruitmentPlan);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        }
    };

    if (loading) {
        return <Loading />;
    }

    if (!user || user.position !== 'HR Admin') {
        return <LoginPage />;
    }

    return (
        <div className={styles.dashboard}>
            <Sidebar activeComponent={'dashboard'} />
            <div className={styles.content}>
                <header className={styles.header}>
                    <GreetingHeader username={user.firstName} />
                </header>
                <div className={styles.mainSection}>
                    <div className={styles.statsOverview}>
                        <div className={styles.statCard}>
                            <h3>Total Responses</h3>
                            <p>{totalResponses}</p>
                            <span className={styles.increase}>+15%</span>
                        </div>
                        <div className={styles.statCard}>
                            <h3>Responses Today</h3>
                            <p>{responsesToday}</p>
                            <span className={styles.decrease}>-10%</span>
                        </div>
                        <div className={styles.statCard}>
                            <h3>Total Vacancies</h3>
                            <p>{totalVacancies}</p>
                        </div>
                        <div className={styles.statCard}>
                            <h3>Closed Vacancies</h3>
                            <p>{closedVacancies} out of {totalVacancies}</p>
                        </div>
                        <div className={styles.statCard}>
                            <h3>Recruitment Plan</h3>
                            <p>{recruitmentPlan} out of 61</p>
                        </div>
                    </div>
                    {/* <CandidateStatistics /> */}
                    <CandidateStatistics/>
                    <CandidateSource />
                    <RecruiterRating />
                    <HRProgressBar />
                </div>
            </div>
        </div>
    );
}

export default HRDashboard;
