import React, { useState } from 'react';
import axios from 'axios';
import styles from './styles/MessageInput.module.css';
import { useAuth } from '../context/AuthContext';
import Loading from './Loading';

const MessageInput = ({ activeChat }) => {
    const [message, setMessage] = useState('');
    const {user, loading} = useAuth();

    const handleSendMessage = async (e) => {
        e.preventDefault();
        console.log(activeChat);
        if (!message.trim() || !activeChat) return;

        try {
            await axios.post('/api/messages/add', {
                from: activeChat._id,  // Assuming activeChat has _id
                to: user._id, // Replace with the actual user's ID you're messaging
                content: message,
            });
            setMessage('');
            // Optionally refresh messages after sending
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    if(loading) return (<Loading/>);

    return (
        <div className={styles.messageInput}>
            <form onSubmit={handleSendMessage} className={styles.inputForm}>
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={styles.inputField}
                />
                <button type="submit" className={styles.sendButton}>Send</button>
            </form>
        </div>
    );
};

export default MessageInput;


// import React, { useState } from 'react';
// import styles from './styles/MessageInput.module.css';

// const MessageInput = ({ onSendMessage }) => {
//     const [message, setMessage] = useState('');

//     const handleSend = (e) => {
//         e.preventDefault();
//         if (message.trim()) {
//             onSendMessage(message);
//             setMessage('');
//         }
//     };

//     return (
//         <form onSubmit={handleSend} className={styles.messageInput}>
//             <input
//                 type="text"
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 placeholder="Type your message..."
//                 className={styles.input}
//             />
//             <button type="submit" className={styles.sendButton}>Send</button>
//         </form>
//     );
// };

// export default MessageInput;
