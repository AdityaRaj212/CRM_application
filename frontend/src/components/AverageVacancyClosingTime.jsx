import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './styles/AverageVacancyClosingTime.module.css'; 
import UserProfileCircle from './UserProfileCircle';

const AverageVacancyClosingTime = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchAverageClosingTime = async () => {
            try {
                const response = await axios.get('/api/vacancies/average-closing-time');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching average closing times:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAverageClosingTime();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Placeholder while loading
    }

    return (
        <div className={styles.container}>
            <h2>Average Vacancy Closing Time</h2>
            <div className={styles.grid}>
                {data.map((item) => (
                    <div key={item.recruiterId} className={styles.card}>
                        <div className={styles.profile}>
                            {/* <img 
                                src={item.recruiterInfo.profileImg || 'defaultProfile.png'} 
                                alt={`${item.recruiterInfo.firstName} ${item.recruiterInfo.lastName}`} 
                                className={styles.profileImage} 
                            /> */}
                            {/* <span className={styles.initials}> */}
                                {/* {item.recruiterInfo.firstName.charAt(0)} */}
                                <UserProfileCircle user={item.recruiterInfo} />
                            {/* </span> */}
                        </div>
                        <div className={styles.info}>
                            <span className={styles.name}>
                                {item.recruiterInfo.firstName} {item.recruiterInfo.lastName}
                            </span>
                            <div className={styles.closingTime}>
                                <div>

                                {item.averageClosingTime}
                                </div>
                                <div>
                                days
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AverageVacancyClosingTime;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import styles from './styles/AverageVacancyClosingTime.module.css'; 

// const AverageVacancyClosingTime = () => {
//     const [loading, setLoading] = useState(true);
//     const [data, setData] = useState([]);

//     useEffect(() => {
//         const fetchAverageClosingTime = async () => {
//             try {
//                 const response = await axios.get('/api/vacancies/average-closing-time');
//                 console.log('avg: ', response.data);
//                 setData(response.data);
//             } catch (error) {
//                 console.error('Error fetching average closing times:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchAverageClosingTime();
//     }, []);

//     if (loading) {
//         return <div>Loading...</div>; // Placeholder while loading
//     }

//     return (
//         <div className={styles.container}>
//             <h2>Average Vacancy Closing Time</h2>
//             <div className={styles.grid}>
//                 {data.map((item) => (
//                     <div key={item.recruiterId} className={styles.card}>
//                         <div className={styles.profile}>
//                             <img 
//                                 src={item.recruiterInfo.profileImg || 'defaultProfile.png'} 
//                                 alt={`${item.recruiterInfo.firstName} ${item.recruiterInfo.lastName}`} 
//                                 className={styles.profileImage} 
//                             />
//                             <span className={styles.initials}>
//                                 {item.recruiterInfo.firstName.charAt(0)}
//                             </span>
//                         </div>
//                         <div className={styles.info}>
//                             <span className={styles.name}>
//                                 {item.recruiterInfo.firstName} {item.recruiterInfo.lastName}
//                             </span>
//                             <span className={styles.closingTime}>
//                                 {item.averageClosingTime} days
//                             </span>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default AverageVacancyClosingTime;
