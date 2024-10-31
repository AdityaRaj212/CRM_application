import React from 'react';
import styles from './styles/ChatWindow.module.css';

const ChatWindow = ({ messages, activeChat }) => {
    return (
        <div className={styles.chatWindow}>
            <div className={styles.header}>
                <h2>{activeChat ? `${activeChat.firstName} ${activeChat.lastName}` : 'Select a chat'}</h2>
            </div>
            <div className={styles.chatWindowContent}>
                {messages.map(message => (
                    <div key={message._id} className={`${styles.chatMessage} ${message.from._id === activeChat._id ? styles.sent : styles.received}`}>
                        <div className={styles.messageContent}>{message.content}</div>
                        <span className={styles.time}>{new Date(message.time).toLocaleTimeString()}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChatWindow;


// import React, { useEffect, useRef } from 'react';
// import MessageInput from './MessageInput';
// import styles from './styles/ChatWindow.module.css';

// const ChatWindow = ({ selectedUser, messages, onSendMessage }) => {
//     const messagesEndRef = useRef(null);

//     useEffect(() => {
//         messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//     }, [messages]);

//     if (!selectedUser) return <div className={styles.emptyChat}>Select a user to chat</div>;

//     return (
//         <div className={styles.chatWindow}>
//             <div className={styles.messages}>
//                 {messages.map((msg, index) => (
//                     <div key={index} className={msg.from === 'currentUserId' ? styles.sent : styles.received}>
//                         <p>{msg.content}</p>
//                         <span>{new Date(msg.time).toLocaleTimeString()}</span>
//                     </div>
//                 ))}
//                 <div ref={messagesEndRef} />
//             </div>
//             <MessageInput onSendMessage={onSendMessage} />
//         </div>
//     );
// };

// export default ChatWindow;
