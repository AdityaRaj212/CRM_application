import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import taskRouter from './features/task/task.router.js';
import userRouter from './features/user/user.router.js';
import projectRouter from './features/project/project.router.js';
import messageRouter from './features/message/message.router.js';
import attendanceRouter from './features/attendance/attendance.router.js';
import { connectUsingMongoose } from './config/mongoose.js';
import { authMiddleware } from './middlewares/auth.middleware.js';

const app = express();

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
app.use('/api/messages', authMiddleware, messageRouter);
app.use('/api/attendance', attendanceRouter);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectUsingMongoose();
  // console.log(process.env.JWTtoken);
});
