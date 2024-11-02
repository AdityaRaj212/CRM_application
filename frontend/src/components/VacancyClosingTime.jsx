import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './styles/VacancyClosingTime.module.css';

const VacancyClosingTime = () => {
    const apiUrl = process.env.REACT_APP_API_BASE_URL;

    const [vacancies, setVacancies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        const fetchVacancies = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/vacancies/`);
                const filteredVacancies = response.data.filter(vacancy => 
                    new Date(vacancy.deadline) >= new Date() // Filter for upcoming deadlines
                );
                setVacancies(filteredVacancies);
            } catch (error) {
                console.error('Error fetching vacancies:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchVacancies();
    }, []);

    const handlePageChange = (direction) => {
        setCurrentPage(prevPage => prevPage + direction);
    };

    const totalVacancies = vacancies.length;
    const currentVacancies = vacancies.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    if (loading) {
        return <div>Loading...</div>; // Placeholder while loading
    }

    if (totalVacancies === 0) {
        return <div>No active vacancies available at this time.</div>; // Message for no vacancies
    }

    return (
        <div className={styles.container}>
            <h2>Vacancy Closing Time</h2>
            <table className={styles.vacancyTable}>
                <thead>
                    <tr>
                        <th>Vacancy</th>
                        <th>Days before deadline</th>
                        <th>Active days</th>
                        <th>Open positions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentVacancies.map(vacancy => {
                        const daysBeforeDeadline = Math.ceil((new Date(vacancy.deadline) - new Date()) / (1000 * 60 * 60 * 24));
                        const activeDays = Math.ceil((new Date() - new Date(vacancy.creationDate)) / (1000 * 60 * 60 * 24));
                        const barWidth = Math.min((daysBeforeDeadline / 30) * 100, 100); // Cap the width at 100%

                        return (
                            <tr key={vacancy._id}>
                                <td className={styles.role}>{vacancy.role}
                                    <div className={styles.progressBar}>
                                        <div style={{ width: `${barWidth}%` }} className={styles.progressFill}></div>
                                    </div>
                                </td>
                                <td>
                                    
                                    {daysBeforeDeadline}
                                </td>
                                <td>{activeDays}</td>
                                <td>{vacancy.openings}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className={styles.pagination}>
                <button className={styles.pageButton} onClick={() => handlePageChange(-1)} disabled={currentPage === 1}>Previous</button>
                <span className={styles.pageInfo}>{currentPage} of {Math.ceil(totalVacancies / itemsPerPage)}</span>
                <button className={styles.pageButton} onClick={() => handlePageChange(1)} disabled={currentPage * itemsPerPage >= totalVacancies}>Next</button>
            </div>
        </div>
    );
};

export default VacancyClosingTime;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import styles from './styles/VacancyClosingTime.module.css';

// const VacancyClosingTime = () => {
//     const [vacancies, setVacancies] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [currentPage, setCurrentPage] = useState(1);
//     const itemsPerPage = 5;

//     useEffect(() => {
//         const fetchVacancies = async () => {
//             try {
//                 const response = await axios.get('/api/vacancies/');
//                 const filteredVacancies = response.data.filter(vacancy => 
//                     new Date(vacancy.deadline) >= new Date() // Filter for upcoming deadlines
//                 );
//                 setVacancies(filteredVacancies);
//             } catch (error) {
//                 console.error('Error fetching vacancies:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchVacancies();
//     }, []);

//     const handlePageChange = (direction) => {
//         setCurrentPage(prevPage => prevPage + direction);
//     };

//     const totalVacancies = vacancies.length;
//     const currentVacancies = vacancies.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

//     if (loading) {
//         return <div>Loading...</div>; // Placeholder while loading
//     }

//     return (
//         <div className={styles.container}>
//             <h2>Vacancy Closing Time</h2>
//             <table className={styles.vacancyTable}>
//                 <thead>
//                     <tr>
//                         <th>Vacancy</th>
//                         <th>Days before deadline</th>
//                         <th>Active days</th>
//                         <th>Open positions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {currentVacancies.map(vacancy => {
//                         const daysBeforeDeadline = Math.ceil((new Date(vacancy.deadline) - new Date()) / (1000 * 60 * 60 * 24));
//                         const activeDays = Math.ceil((new Date() - new Date(vacancy.creationDate)) / (1000 * 60 * 60 * 24));
//                         return (
//                             <tr key={vacancy._id}>
//                                 <td>{vacancy.role}</td>
//                                 <td>
//                                     <div className={styles.progressBar}>
//                                         <div style={{ width: `${(daysBeforeDeadline / 30) * 100}%` }} className={styles.progressFill}></div>
//                                     </div>
//                                     {daysBeforeDeadline}
//                                 </td>
//                                 <td>{activeDays}</td>
//                                 <td>{vacancy.openings}</td>
//                             </tr>
//                         );
//                     })}
//                 </tbody>
//             </table>
//             <div className={styles.pagination}>
//                 <button onClick={() => handlePageChange(-1)} disabled={currentPage === 1}>Previous</button>
//                 <span>{currentPage} of {Math.ceil(totalVacancies / itemsPerPage)}</span>
//                 <button onClick={() => handlePageChange(1)} disabled={currentPage * itemsPerPage >= totalVacancies}>Next</button>
//             </div>
//         </div>
//     );
// };

// export default VacancyClosingTime;
