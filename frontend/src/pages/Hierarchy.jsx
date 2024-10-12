// HierarchyPage.jsx
import React from 'react';
import Sidebar from '../components/Sidebar';
import GreetingHeader from '../components/GreetingHeader';
import styles from './styles/Hierarchy.module.css';
import { useAuth } from '../context/AuthContext';

const Hierarchy = () => {
    const {loading, user} = useAuth();
    const currentUserPosition = 'Employee'; // This should come from your authentication context

    return (
        <div className={styles.dashboard}>
    <Sidebar activeComponent={'hierarchy'}/>
    <div className={styles.content}>
        <header className={styles.header}>
            <GreetingHeader username={user.firstName} />
        </header>

        <div className={styles.mainSection}>
            <div className={styles.headerSection}>
            <div>
                <h2 className={styles.sectionTitle}>Users Dashboard</h2>
            </div>
            </div>
            <div className={styles.hierarchyContainer}>
                <div className={styles.tree}>
                    <div className={styles.node}>
                        <div className={styles.superAdmin}>Super Admin</div>
                        <div className={styles.branch}>
                            <div className={styles.hrAdmin}>HR Admin</div>
                            <div className={styles.branch}>
                                <div className={styles.admin}>Admin</div>
                                <div className={styles.employee + ' ' + styles.currentPosition}>
                                    Employee
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    );
};

export default Hierarchy;


// // HierarchyPage.jsx
// import React from 'react';
// import Sidebar from '../components/Sidebar';
// import GreetingHeader from '../components/GreetingHeader';
// import styles from './styles/Hierarchy.module.css';

// const Hierarchy = () => {
//     const currentUserPosition = 'Employee'; // This should come from your authentication context

//     return (
//         <div className={styles.container}>
//             <Sidebar activeComponent={'hierarchy'} />
//             <div className={styles.content}>
//                 <GreetingHeader username={'User'} /> {/* Replace 'User' with the actual user's name */}
//                 <div className={styles.hierarchyContainer}>
//                     <h1>Organization Hierarchy</h1>
//                     <div className={styles.tree}>
//                         <div className={styles.node}>
//                             <div className={styles.superAdmin}>Super Admin</div>
//                             <div className={styles.branch}>
//                                 <div className={styles.hrAdmin}>HR Admin</div>
//                                 <div className={styles.branch}>
//                                     <div className={styles.admin}>Admin</div>
//                                     <div className={styles.employee + ' ' + styles.currentPosition}>
//                                         Employee
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Hierarchy;




