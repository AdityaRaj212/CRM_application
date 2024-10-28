import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';

import taskRouter from './features/task/task.router.js';
import userRouter from './features/user/user.router.js';
import projectRouter from './features/project/project.router.js';
import messageRouter from './features/message/message.router.js';
import attendanceRouter from './features/attendance/attendance.router.js';
import documentRouter from './features/document/document.router.js';
import candidateRouter from './features/candidate/candidate.router.js';
import dashboardRouter from './features/dashboard/dashboard.router.js'
import vacancyRouter from './features/vacancy/vacancy.router.js';
import { connectUsingMongoose } from './config/mongoose.js';
import { authMiddleware } from './middlewares/auth.middleware.js';

const app = express();

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
app.use('/api/messages', authMiddleware, messageRouter);
app.use('/api/attendance', attendanceRouter);
app.use('/api/documents', documentRouter);
app.use('/api/candidates', candidateRouter);
app.use('/api/hr-dashboard', dashboardRouter);
app.use('/api/vacancies', vacancyRouter);

app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectUsingMongoose();
  // console.log(process.env.JWTtoken);
});
