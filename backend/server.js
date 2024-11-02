import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import http from 'http'; // Import http to create server

import taskRouter from './features/task/task.router.js';
import userRouter from './features/user/user.router.js';
import projectRouter from './features/project/project.router.js';
import messageRouter from './features/message/message.router.js';
import attendanceRouter from './features/attendance/attendance.router.js';
import documentRouter from './features/document/document.router.js';
import candidateRouter from './features/candidate/candidate.router.js';
import dashboardRouter from './features/dashboard/dashboard.router.js';
import vacancyRouter from './features/vacancy/vacancy.router.js';
import { connectUsingMongoose } from './config/mongoose.js';
import { authMiddleware } from './middlewares/auth.middleware.js';
import { Server } from 'socket.io'; // Import socket.io

dotenv.config();

const app = express();
const server = http.createServer(app); // Create server using http
// const io = new Server(server); // Initialize Socket.IO
// const io = new Server(server, {
//     cors: {
//         origin: 'http://localhost:3000', // Your frontend URL
//         methods: ['GET', 'POST'],
//         credentials: true // Allow credentials
//     }
// });


const io = new Server(server, {
    cors: {
        origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
        methods: ['GET', 'POST'],
        credentials: true,
    },
});

// Get the current file's directory (equivalent to __dirname in CommonJS)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.use(bodyParser.json());
// app.use(cookieParser());
app.use(session({
    secret: 'pranjan_crm',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Routes
// app.use('/api/tasks', authMiddleware, taskRouter);
app.use('/api/tasks', taskRouter);
app.use('/api/users', userRouter);
app.use('/api/projects', authMiddleware, projectRouter);
app.use('/api/messages', messageRouter);
app.use('/api/attendance', attendanceRouter);
app.use('/api/documents', documentRouter);
app.use('/api/candidates', candidateRouter);
app.use('/api/hr-dashboard', dashboardRouter);
app.use('/api/vacancies', vacancyRouter);

app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Socket.IO connection
io.on('connection', (socket) => {
    console.log('New user connected:', socket.id);

    // Store user socket connections (you may want a more robust solution in production)
    socket.on('registerUser', (userId) => {
        socket.userId = userId;
        console.log(`User ${userId} registered with socket ID: ${socket.id}`);
    });

    // Listen for sendMessage event and emit to the recipient
    socket.on('sendMessage', async (data) => {
        console.log('Message received:', data);

        // Optionally save the message to the database here
        // Example: await messageRepository.addMessage(data.from, data.to, data.content);

        // Emit message to the recipient if they are connected
        for (let [id, connectedSocket] of io.sockets.sockets) {
            if (connectedSocket.userId === data.to) {
                connectedSocket.emit('receiveMessage', data);
                break;
            }
        }

        // Emit the message back to the sender
        socket.emit('receiveMessage', data);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});


// // Socket.IO connection
// io.on('connection', (socket) => {
//     console.log('New user connected:', socket.id);

//     // Listen for messages
//     socket.on('sendMessage', async (data) => {
//         // Save message to the database if necessary
//         // Example: await messageRepository.addMessage(data.from, data.to, data.content);

//         // Emit message to the intended recipient
//         socket.to(data.to).emit('receiveMessage', data);
//     });

//     // Handle disconnection
//     socket.on('disconnect', () => {
//         console.log('User disconnected:', socket.id);
//     });
// });

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectUsingMongoose();
    // console.log(process.env.JWTtoken);
});


// import dotenv from 'dotenv';

// dotenv.config();

// import express from 'express';
// import cors from 'cors';
// import cookieParser from 'cookie-parser';
// import session from 'express-session';
// import path from 'path';
// import { fileURLToPath } from 'url';

// import taskRouter from './features/task/task.router.js';
// import userRouter from './features/user/user.router.js';
// import projectRouter from './features/project/project.router.js';
// import messageRouter from './features/message/message.router.js';
// import attendanceRouter from './features/attendance/attendance.router.js';
// import documentRouter from './features/document/document.router.js';
// import candidateRouter from './features/candidate/candidate.router.js';
// import dashboardRouter from './features/dashboard/dashboard.router.js'
// import vacancyRouter from './features/vacancy/vacancy.router.js';
// import { connectUsingMongoose } from './config/mongoose.js';
// import { authMiddleware } from './middlewares/auth.middleware.js';

// const app = express();

// // Get the current file's directory (equivalent to __dirname in CommonJS)
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors());
// // app.use(bodyParser.json());
// // app.use(cookieParser());
// app.use(session({
//     secret: 'pranjan_crm',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false }
// }));

// // Routes
// // app.use('/api/tasks', authMiddleware, taskRouter);
// app.use('/api/tasks', taskRouter);
// app.use('/api/users', userRouter);
// app.use('/api/projects', authMiddleware, projectRouter);
// app.use('/api/messages', authMiddleware, messageRouter);
// app.use('/api/attendance', attendanceRouter);
// app.use('/api/documents', documentRouter);
// app.use('/api/candidates', candidateRouter);
// app.use('/api/hr-dashboard', dashboardRouter);
// app.use('/api/vacancies', vacancyRouter);

// app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// // Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
//   connectUsingMongoose();
//   // console.log(process.env.JWTtoken);
// });
