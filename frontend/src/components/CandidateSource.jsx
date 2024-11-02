import React, { useEffect, useState } from 'react';
import styles from './styles/CandidateSource.module.css';
import { Pie } from 'react-chartjs-2';
import axios from 'axios'; // Import Axios
import {
    Chart,
    ArcElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

// Register the required components
Chart.register(
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const CandidateSource = () => {
    const apiUrl = process.env.REACT_APP_API_BASE_URL;

    const [sources, setSources] = useState([]);

    useEffect(() => {
        // Fetch candidate source data from the backend
        fetchCandidateSources();
    }, []);

    const fetchCandidateSources = async () => {
        try {
            const response = await axios.get('/api/candidates/sources'); // Use Axios
            setSources(response.data);
        } catch (error) {
            console.error('Error fetching candidate sources:', error);
        }
    };

    const chartData = {
        labels: sources.map(source => source.name),
        datasets: [{
            data: sources.map(source => source.count),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        }],
    };

    return (
        <div className={styles.container}>
            <h2>Candidate Source</h2>
            <Pie data={chartData} options={{ responsive: true }} />
        </div>
    );
};

export default CandidateSource;
