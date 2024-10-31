import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './styles/ChatList.module.css';

const ChatList = ({ onSelectChat }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/api/users/'); // Fetch users
                setUsers(response.data.users);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <ul className={styles.chatList}>
            {users.map(user => (
                <li key={user._id} className={styles.chatListItem} onClick={() => onSelectChat(user)}>
                    <span className={styles.userName}>{user.firstName} {user.lastName}</span>
                    <span className={styles.userStatus}>Active</span>
                </li>
            ))}
        </ul>
    );
};

export default ChatList;


// import React from 'react';
// import styles from './styles/ChatList.module.css';

// const ChatList = ({ users, onUserSelect }) => {
//     return (
//         <div className={styles.chatList}>
//             {users.map((user) => (
//                 <div key={user._id} className={styles.user} onClick={() => onUserSelect(user._id)}>
//                     <span>{user.firstName} {user.lastName}</span>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default ChatList;
