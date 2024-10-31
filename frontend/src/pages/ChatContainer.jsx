import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import ChatList from '../components/ChatList';
import ChatWindow from '../components/ChatWindow';
import MessageInput from '../components/MessageInput';
import styles from './styles/ChatContainer.module.css';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';
import LoginPage from './Login';
import GreetingHeader from '../components/GreetingHeader';
import Sidebar from '../components/Sidebar';

const ChatContainer = () => {
    const {user, loading} = useAuth();
    const [activeChat, setActiveChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const socket = io('http://localhost:5000'); // Connect to the server    

    useEffect(() => {
        socket.on('receiveMessage', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.off('receiveMessage'); // Clean up the listener
        };
    }, [socket]);

    useEffect(() => {
        if (activeChat) {
            fetchMessages(activeChat._id);
        }
    }, [activeChat]);

    const fetchMessages = async (userId) => {
        try {
            const response = await axios.get(`/api/messages/between/${user._id}/${userId}`);
            console.log('msgs: ', response.data.messages);
            setMessages(response.data.messages);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    if(loading) return (<Loading/>);

    if(!user) return (<LoginPage/>);

    // return (
    //     <div>
    //         <ChatList onSelectChat={setActiveChat} />
    //         <ChatWindow messages={messages} activeChat={activeChat} />
    //         <MessageInput activeChat={activeChat} socket={socket} />
    //     </div>
    // );
    return (
        <div className={styles.dashboard}>
          <Sidebar activeComponent={'message'}/>
          <div className={styles.content}>
            <header className={styles.header}>
              <GreetingHeader username={user.firstName} />
            </header>
    
            <div className={styles.mainSection}>
                <ChatList onSelectChat={setActiveChat} />
                <div className={styles.mainChat}>
                    <ChatWindow messages={messages} activeChat={activeChat} />
                    <MessageInput activeChat={activeChat} socket={socket} />
                </div>
            </div>
          </div>
        </div>
      );
};


export default ChatContainer;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import ChatList from '../components/ChatList';
// import ChatWindow from '../components/ChatWindow';
// import MessageInput from '../components/MessageInput';
// import styles from './styles/ChatContainer.module.css';

// const ChatContainer = () => {
//     const [activeChat, setActiveChat] = useState(null);
//     const [messages, setMessages] = useState([]);

//     useEffect(() => {
//         if (activeChat) {
//             fetchMessages(activeChat._id);
//         }
//     }, [activeChat]);

//     const fetchMessages = async (userId) => {
//         try {
//             const response = await axios.get(`/api/messages/between/${userId}`);
//             setMessages(response.data.messages);
//         } catch (error) {
//             console.error('Error fetching messages:', error);
//         }
//     };

//     return (
//         <div className={styles.chatContainer}>
//             <ChatList onSelectChat={setActiveChat} />
//             <ChatWindow messages={messages} activeChat={activeChat} />
//             <MessageInput activeChat={activeChat} />
//         </div>
//     );
// };

// export default ChatContainer;
