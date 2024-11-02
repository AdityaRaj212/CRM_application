import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './styles/CandidateFunnel.module.css'; 

const CandidateFunnel = () => {
    const apiUrl = process.env.REACT_APP_API_BASE_URL;

    const [totalCandidates, setTotalCandidates] = useState(100);
    const [loading, setLoading] = useState(true);
    const [funnelData, setFunnelData] = useState([]);

    useEffect(() => {
        const fetchFunnelData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/candidates/status-counts`); // Fetch data from backend
                const { statusCounts, statusPercentages } = response.data;
                setTotalCandidates(response.data.totalCandidates);

                // Format the data for display
                const formattedData = [
                    {
                        status: 'New Candidate',
                        candidates: statusCounts.Applied,
                        percentage: statusPercentages.Applied,
                    },
                    {
                        status: 'Interviewed',
                        candidates: statusCounts.Interviewed,
                        percentage: statusPercentages.Interviewed,
                    },
                    {
                        status: 'Rejected',
                        candidates: statusCounts.Rejected,
                        percentage: statusPercentages.Rejected,
                    },
                    {
                        status: 'Hired',
                        candidates: statusCounts.Hired || 0, // Ensure the key exists
                        percentage: statusPercentages.Hired || '0%', // Ensure the key exists
                    }
                ];

                setFunnelData(formattedData);
            } catch (error) {
                console.error('Error fetching candidate funnel data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFunnelData();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Placeholder while loading
    }

    return (
        <div className={styles.container}>
            <h2>Candidate Funnel</h2>
            <table className={styles.funnelTable}>
                <thead>
                    <tr>
                        <th>Status</th>
                        <th>Candidates</th>
                        <th>% of the total</th>
                        {/* <th>Average time on the status, hrs</th> */}
                    </tr>
                </thead>
                <tbody>
                    {funnelData.map((item) => (
                        <tr key={item.status}>
                            <td className={styles.status}>{item.status}
                            <div className={styles.progressBar}>
                                    <div 
                                        style={{ width: `${(item.candidates / totalCandidates) * 100}%` }} // Assuming 483 is the total candidates count
                                        className={styles.progressFill} 
                                    />
                                </div>
                            </td>
                            <td>
                                {item.candidates} 
                                {/* <div className={styles.progressBar}>
                                    <div 
                                        style={{ width: `${(item.candidates / totalCandidates) * 100}%` }} // Assuming 483 is the total candidates count
                                        className={styles.progressFill} 
                                    />
                                </div> */}
                            </td>
                            <td>{item.percentage}%</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CandidateFunnel;
