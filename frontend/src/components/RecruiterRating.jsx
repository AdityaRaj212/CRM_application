import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './styles/RecruiterRating.module.css';
import { useAuth } from '../context/AuthContext';
import Loading from './Loading';
import PulseLoader from 'react-spinners/PulseLoader'; // Import PulseLoader from react-spinners
import UserProfileCircle from './UserProfileCircle';

const RecruiterRating = () => {
    const apiUrl = process.env.REACT_APP_API_BASE_URL;

    const { loading } = useAuth();
    const [loading2, setLoading2] = useState(true);
    const [ratings, setRatings] = useState([]);
    const [users, setUsers] = useState([]);
    const [hrUsers, setHrUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
        setLoading2(false);
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/users/`);
            const allUsers = response.data.users;
            setUsers(allUsers);

            // Filter HR users
            const hrArray = allUsers.filter(user => user.position === 'HR Admin');
            setHrUsers(hrArray);
            
            // Fetch recruiter ratings after fetching users
            fetchRecruiterRatings(hrArray);
        } catch (err) {
            console.error('Error while fetching users: ', err);
        }
    };

    const fetchRecruiterRatings = async (hrArray) => {
        try {
            const promises = hrArray.map(async (hr) => {
                const vacancyResponse = await axios.get(`${apiUrl}/api/vacancies/user/${hr._id}`);
                const vacancies = vacancyResponse.data;
                return {
                    id: hr._id,
                    name: `${hr.firstName} ${hr.lastName}`,
                    activeVacancies: vacancies.length,
                    responses: vacancies.reduce((total, vac) => total + (vac.applicants ? vac.applicants.length : 0), 0),
                    hired: vacancies.reduce((total, vac) => total + (vac.hired ? vac.hired.length : 0), 0)
                };
            });

            const results = await Promise.all(promises);
            setRatings(results);
        } catch (error) {
            console.error('Error fetching recruiter ratings:', error);
        }
    };

    if (loading || loading2) {
        return (
            <div className={styles.loadingContainer}>
                <PulseLoader color="#6772e5" loading={loading || loading2} size={15} />
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h2>Recruiters Rating</h2>
            <table className={styles.ratingTable}>
                <thead>
                    <tr>
                        <th>Recruiter</th>
                        <th>Active Vacancies</th>
                        <th>Number of Responses</th>
                        <th>Employees Hired</th>
                    </tr>
                </thead>
                <tbody>
                    {ratings.map((recruiter) => (
                        <tr key={recruiter.id}>
                            {/* <td>{<UserProfileCircle user={recruiter}/>}</td> */}
                            {/* <td>{recruiter.name}</td> */}
                            <td className={styles.recruiter}>
                                <UserProfileCircle user={{ firstName: recruiter.name.split(' ')[0], lastName: recruiter.name.split(' ')[1] }} />
                                {recruiter.name}
                            </td>
                            <td>{recruiter.activeVacancies}</td>
                            <td>{recruiter.responses}</td>
                            <td>
                                {recruiter.hired}
                                {/* {recruiter.hired} | {recruiter.activeVacancies} 
                                <div className={styles.progressBar}>
                                    <div style={{ width: `${(recruiter.hired / recruiter.activeVacancies) * 100}%` }} className={styles.progressFill}></div>
                                </div> */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RecruiterRating;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import styles from './styles/RecruiterRating.module.css';
// import { useAuth } from '../context/AuthContext';
// import Loading from './Loading';

// const RecruiterRating = () => {
//     const {loading} = useAuth();
//     const [loading2, setLoading2] = useState(true);
//     const [ratings, setRatings] = useState([]);
//     const [users, setUsers] = useState([]);
//     const [hrUsers, setHrUsers] = useState([]); // Array to store HR users

//     useEffect(() => {
//         fetchUsers();
//         setLoading2(false);
//     }, []);

//     const fetchUsers = async () => {
//         try {
//             const response = await axios.get('/api/users/');
//             const allUsers = response.data.users;
//             setUsers(allUsers);

//             // Filter HR users
//             const hrArray = allUsers.filter(user => user.position === 'HR Admin');
//             // const hrArray = allUsers.filter(user => user.position === 'HR Admin' || user.position === 'Super Admin');
//             setHrUsers(hrArray);
            
//             // Fetch recruiter ratings after fetching users
//             fetchRecruiterRatings(hrArray);
//         } catch (err) {
//             console.error('Error while fetching users: ', err);
//         }
//     };

//     const fetchRecruiterRatings = async (hrArray) => {
//         try {
//             console.log(hrArray);
//             const promises = hrArray.map(async (hr) => {
//                 const vacancyResponse = await axios.get(`/api/vacancies/user/${hr._id}`);
//                 const vacancies = vacancyResponse.data;
//                 return {
//                     id: hr._id,
//                     name: `${hr.firstName} ${hr.lastName}`,
//                     activeVacancies: vacancies.length,
//                     responses: vacancies.reduce((total, vac) => total + (vac.applicants ? vac.applicants.length : 0), 0),
//                     hired: vacancies.reduce((total, vac) => total + (vac.hired ? vac.hired.length : 0), 0)
//                 };
//             });

//             const results = await Promise.all(promises);
//             setRatings(results);
//         } catch (error) {
//             console.error('Error fetching recruiter ratings:', error);
//         }
//     };

//     if(loading || loading2){
//         return (<Loading/>);
//     }

//     return (
//         <div className={styles.container}>
//             <h2>Recruiters Rating</h2>
//             <table className={styles.ratingTable}>
//                 <thead>
//                     <tr>
//                         <th>Recruiter</th>
//                         <th>Active Vacancies</th>
//                         <th>Number of Responses</th>
//                         <th>Employees Hired</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {ratings.map((recruiter) => (
//                         <tr key={recruiter.id}>
//                             <td>{recruiter.name}</td>
//                             <td>{recruiter.activeVacancies}</td>
//                             <td>{recruiter.responses}</td>
//                             <td>{recruiter.hired}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default RecruiterRating;