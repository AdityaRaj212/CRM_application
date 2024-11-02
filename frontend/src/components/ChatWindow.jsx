import React from 'react';
import styles from './styles/ChatWindow.module.css';

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

const isNewDay = (currentMessageDate, previousMessageDate) => {
    if (!previousMessageDate) return true; // First message should show the date
    const currentDate = new Date(currentMessageDate).setHours(0, 0, 0, 0);
    const previousDate = new Date(previousMessageDate).setHours(0, 0, 0, 0);
    return currentDate !== previousDate;
};

const ChatWindow = ({ messages, activeChat, loading }) => {
    if (loading) {
        return (
            <div className={styles.chatWindow}>
                <div className={styles.header}>
                    <h2>{activeChat ? `${activeChat.firstName} ${activeChat.lastName}` : 'Select a chat'}</h2>
                </div>
                <div className={styles.chatWindowContent}>
                    <p className={styles.loadingMessage}>Loading chat...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.chatWindow}>
            <div className={styles.header}>
                <h2>{activeChat ? `${activeChat.firstName} ${activeChat.lastName}` : 'Select a chat'}</h2>
            </div>
            <div className={styles.chatWindowContent}>
                {messages.length === 0 ? (
                    <p className={styles.noMessages}>No messages yet. Start the conversation!</p>
                ) : (
                    messages.map((message, index) => {
                        const showDate = isNewDay(
                            message.time,
                            index > 0 ? messages[index - 1].time : null
                        );

                        return (
                            <React.Fragment key={message._id}>
                                {showDate && (
                                    <div className={styles.dateDivider}>
                                        {formatDate(message.time)}
                                    </div>
                                )}
                                <div
                                    className={`${styles.chatMessage} ${
                                        message.from._id === activeChat._id
                                            ? styles.sent
                                            : styles.received
                                    }`}
                                >
                                    <div className={styles.messageContent}>
                                        {message.content}
                                        <span className={styles.time}>
                                            {new Date(message.time).toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </span>
                                    </div>
                                </div>
                            </React.Fragment>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default ChatWindow;


// import React from 'react';
// import styles from './styles/ChatWindow.module.css';

// const formatDate = (dateString) => {
//     const options = { year: 'numeric', month: 'long', day: 'numeric' };
//     return new Date(dateString).toLocaleDateString(undefined, options);
// };

// const isNewDay = (currentMessageDate, previousMessageDate) => {
//     if (!previousMessageDate) return true; // First message should show the date
//     const currentDate = new Date(currentMessageDate).setHours(0, 0, 0, 0);
//     const previousDate = new Date(previousMessageDate).setHours(0, 0, 0, 0);
//     return currentDate !== previousDate;
// };

// const ChatWindow = ({ messages, activeChat }) => {
//     return (
//         <div className={styles.chatWindow}>
//             <div className={styles.header}>
//                 <h2>{activeChat ? `${activeChat.firstName} ${activeChat.lastName}` : 'Select a chat'}</h2>
//             </div>
//             <div className={styles.chatWindowContent}>
//                 {messages.map((message, index) => {
//                     const showDate = isNewDay(
//                         message.time,
//                         index > 0 ? messages[index - 1].time : null
//                     );

//                     return (
//                         <React.Fragment key={message._id}>
//                             {showDate && (
//                                 <div className={styles.dateDivider}>
//                                     {formatDate(message.time)}
//                                 </div>
//                             )}
//                             <div
//                                 className={`${styles.chatMessage} ${
//                                     message.from._id === activeChat._id
//                                         ? styles.sent
//                                         : styles.received
//                                 }`}
//                             >
//                                 <div className={styles.messageContent}>
//                                     {message.content}
//                                     <span className={styles.time}>
//                                         {new Date(message.time).toLocaleTimeString([], {
//                                             hour: '2-digit',
//                                             minute: '2-digit',
//                                         })}
//                                     </span>
//                                 </div>
//                             </div>
//                         </React.Fragment>
//                     );
//                 })}
//             </div>
//         </div>
//     );
// };

// export default ChatWindow;
