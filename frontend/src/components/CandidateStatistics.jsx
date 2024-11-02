import React, { useEffect, useState, useRef } from 'react';
import styles from './styles/CandidateStatistics.module.css'; // Import your CSS styles
import { Bar } from 'react-chartjs-2';
import axios from 'axios'; // Import Axios
import {
    Chart,
    CategoryScale,
    ArcElement,
    BarElement,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement
} from 'chart.js';
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns'; // Import date-fns for date manipulation

// Register the required components
Chart.register(
    CategoryScale,
    ArcElement,
    BarElement,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement
);

const CandidateStatistics = () => {
    const apiUrl = process.env.REACT_APP_API_BASE_URL;

    const [candidates, setCandidates] = useState([]);
    const [month, setMonth] = useState(new Date()); // State to manage the selected month
    const chartRef = useRef(); // Reference to the chart instance

    useEffect(() => {
        fetchAllCandidates();
    }, []); // Fetch all candidates once on mount

    useEffect(() => {
        // Only update the chart when month changes
        if (chartRef.current) {
            const chartInstance = chartRef.current.chartInstance;
            if (chartInstance) {
                chartInstance.destroy(); // Cleanup previous instance
            }
        }
    }, [month]); // Cleanup chart instance when month changes

    const fetchAllCandidates = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/candidates/`);
            setCandidates(response.data);
        } catch (err) {
            console.error('Error while fetching all candidates: ', err);
        }
    };

    // Function to aggregate data by date for the selected month
    const aggregateData = () => {
        const start = startOfMonth(month);
        const end = endOfMonth(month);
        const days = eachDayOfInterval({ start, end });

        return days.map(day => {
            const formattedDate = format(day, 'yyyy-MM-dd');
            const responsesCount = candidates.filter(candidate => 
                format(new Date(candidate.appliedDate), 'yyyy-MM-dd') === formattedDate
            ).length;

            const hiredCount = candidates.filter(candidate => 
                format(new Date(candidate.appliedDate), 'yyyy-MM-dd') === formattedDate && candidate.status === 'Hired'
            ).length;

            return {
                date: formattedDate,
                receivedResponses: responsesCount,
                candidatesHired: hiredCount,
            };
        });
    };

    const chartData = {
        labels: aggregateData().map(stat => format(new Date(stat.date), 'd')),
        datasets: [
            {
                label: 'Received Responses',
                data: aggregateData().map(stat => stat.receivedResponses),
                backgroundColor: 'rgba(103, 178, 239, 0.5)',
                borderColor: 'rgba(103, 178, 239, 1)',
                borderWidth: 2,
                barThickness: 'flex',
            },
            {
                label: 'Candidates Hired',
                data: aggregateData().map(stat => stat.candidatesHired),
                backgroundColor: 'rgba(25, 135, 84, 0.8)',
                borderColor: 'rgba(25, 135, 84, 1)',
                borderWidth: 2,
                type: 'line',
                fill: false,
                tension: 0.4,
                pointRadius: 5,
            },
        ],
    };

    return (
        <div className={styles.container}>
            <h2>Candidate Statistics</h2>
            <div className={styles.monthSelector}>
                <label htmlFor="month">Select Month: </label>
                <select 
                    id="month" 
                    value={format(month, 'yyyy-MM')} 
                    onChange={e => setMonth(new Date(e.target.value + '-01'))}
                    className={styles.monthDropdown}
                >
                    {Array.from({ length: 12 }, (_, i) => {
                        const date = new Date();
                        date.setMonth(date.getMonth() - i);
                        return (
                            <option key={date} value={format(date, 'yyyy-MM')}>
                                {format(date, 'MMMM yyyy')}
                            </option>
                        );
                    }).reverse()}
                </select>
            </div>
            <div className={styles.graph}>
                <Bar 
                    ref={chartRef}
                    data={chartData} 
                    // height={400}
                    options={{ 
                        responsive: true, 
                        maintainAspectRatio: true,
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    // Adjust the step size for better spacing
                                    stepSize: 1,
                                }
                            }
                        }
                    }} 
                />
            </div>
        </div>
    );
};

export default CandidateStatistics;






// import React, { useEffect, useState } from 'react';
// import styles from './styles/CandidateStatistics.module.css'; // Import your CSS styles
// import { Bar } from 'react-chartjs-2';
// import axios from 'axios'; // Import Axios
// import {
//     Chart,
//     CategoryScale,
//     ArcElement,
//     BarElement,
//     LinearScale,
//     Title,
//     Tooltip,
//     Legend
// } from 'chart.js';
// import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns'; // Import date-fns for date manipulation

// // Register the required components
// Chart.register(
//     CategoryScale,
//     ArcElement,
//     BarElement,
//     LinearScale,
//     Title,
//     Tooltip,
//     Legend
// );

// const CandidateStatistics = () => {
//     const [data, setData] = useState([]);
//     const [candidates, setCandidates] = useState([]);
//     const [month, setMonth] = useState(new Date()); // State to manage the selected month

//     useEffect(() => {
//         fetchAllCandidates();
//         fetchCandidateStatistics();
//     }, [month]); // Fetch data whenever the month changes

//     const fetchAllCandidates = async () => {
//         try {
//             const response = await axios.get('/api/candidates/');
//             console.log('Candidates: ', response.data);
//             setCandidates(response.data);
//         } catch (err) {
//             console.error('Error while fetching all candidates: ', err);
//         }
//     };

//     const fetchCandidateStatistics = async () => {
//         try {
//             const response = await axios.get('/api/candidates/statistics');
//             console.log('stats: ', response.data);
//             setData(response.data);
//         } catch (error) {
//             console.error('Error fetching candidate statistics:', error);
//         }
//     };

//     // Function to aggregate data by date for the selected month
//     const aggregateData = () => {
//         const start = startOfMonth(month);
//         const end = endOfMonth(month);
//         const days = eachDayOfInterval({ start, end });
        
//         const aggregatedData = days.map(day => {
//             const formattedDate = format(day, 'yyyy-MM-dd');
//             const responsesCount = candidates.filter(candidate => 
//                 format(new Date(candidate.appliedDate), 'yyyy-MM-dd') === formattedDate
//             ).length;

//             const hiredCount = candidates.filter(candidate => 
//                 format(new Date(candidate.appliedDate), 'yyyy-MM-dd') === formattedDate && candidate.status === 'Hired'
//             ).length;

//             return {
//                 date: formattedDate,
//                 receivedResponses: responsesCount,
//                 candidatesHired: hiredCount,
//             };
//         });

//         return aggregatedData;
//     };

//     const chartData = {
//         labels: aggregateData().map(stat => stat.date),
//         datasets: [
//             {
//                 label: 'Received Responses',
//                 data: aggregateData().map(stat => stat.receivedResponses),
//                 backgroundColor: 'rgba(103, 178, 239, 0.5)',
//             },
//             {
//                 label: 'Candidates Hired',
//                 data: aggregateData().map(stat => stat.candidatesHired),
//                 backgroundColor: 'rgba(25, 135, 84, 0.5)',
//             },
//         ],
//     };

//     return (
//         <div className={styles.container}>
//             <h2>Candidate Statistics</h2>
//             <select value={format(month, 'yyyy-MM')} onChange={e => setMonth(new Date(e.target.value + '-01'))}>
//                 {Array.from({ length: 12 }, (_, i) => {
//                     const date = new Date();
//                     date.setMonth(date.getMonth() - i);
//                     return (
//                         <option key={date} value={format(date, 'yyyy-MM')}>
//                             {format(date, 'MMMM yyyy')}
//                         </option>
//                     );
//                 }).reverse()}
//             </select>
//             <Bar data={chartData} options={{ responsive: true }} />
//         </div>
//     );
// };

// export default CandidateStatistics;
