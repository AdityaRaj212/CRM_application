import express from 'express';
import UserController from './user.controller.js';

const userController = new UserController();
const router = express.Router();

router.get('/', (req, res) => userController.allUsers(req, res));

// Local Signup
router.post('/signup', (req, res) => userController.signup(req, res));

// Local Login
router.post('/login', (req, res) => userController.login(req, res));

// Google OAuth Login/Signup
router.post('/oauth/google', (req, res) => userController.googleOAuth(req, res));

router.get('/get-user-by-id/:userId', (req, res) => userController.findUserById(req, res));

export default router;
