import UserRepository from "./user.repository.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";  // For JWT authentication
import { OAuth2Client } from "google-auth-library";  // For Google OAuth

export default class UserController {
    constructor() {
        this.userRepository = new UserRepository();
        this.googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID); // Initialize Google OAuth2Client
    }

    async allUsers(req, res){
        try{
            const users = await this.userRepository.allUsers();
            res.status(200).json({
                status: true,
                users
            })
        }catch(err){
            res.status(500).json({
                message: 'Error while fetching all users',
                error: err.message
            })
        }
    }

    // Local Signup
    async signup(req, res) {
        try {
            const { firstName, lastName, email, mobileNo, position, userName, password } = req.body;
            const existingUser = await this.userRepository.findByEmail(email);
            if (existingUser) {
                return res.status(400).json({ message: "User already exists" });
            }

            const newUser = await this.userRepository.addUser(firstName, lastName, email, mobileNo, position, userName, password);
            return res.status(201).json({ status: true, user: newUser });
        } catch (err) {
            console.error('Error while signing up: ', err);
            return res.status(500).json({ message: 'Error signing up', error: err.message });
        }
    }

    // Local Login
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await this.userRepository.findByEmail(email);

            if (!user || !(await user.matchPassword(password))) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }
            console.log(process.env.JWT_SECRET);
            const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.status(200).json({ status: true, token, userId: user._id }); // added userId
        } catch (err) {
            console.error('Error while logging in: ', err);
            return res.status(500).json({ message: 'Error logging in', error: err.message });
        }
    }

    // Google OAuth Login/Signup
    async googleOAuth(req, res) {
        const { tokenId } = req.body;  // The token received from the Google OAuth client
        const userDetails = req.user;

        try {
            const ticket = await this.googleClient.verifyIdToken({
                idToken: tokenId,
                audience: process.env.GOOGLE_CLIENT_ID,
            });
            const { email, name, sub, picture } = ticket.getPayload();  // Google user details
            let user = await this.userRepository.findByOAuthId(sub);  // 'sub' is Google user ID

            // Create user if it doesn't exist
            if (!user) {
                user = await this.userRepository.addUser(name, email, null, picture, 'google', sub);
            }

            const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.status(200).json({ status: true, token, userId: user._id }); // added userId
        } catch (err) {
            console.error('Error during Google OAuth: ', err);
            return res.status(500).json({ message: 'Error during Google OAuth', error: err.message });
        }
    }

    async findUserById(req, res){
        try{
            const {userId} = req.params;
            const user = await this.userRepository.findUserById(userId);
            res.status(200).json({
                status: true,
                user
            })
        }catch(err){
            console.error('Error while fetching user by Id: ', err);
            return res.status(500).json({
                message: 'Error fetching user by id',
                error: err.message
            })
        }
    }

    async updateUser(req, res){
        try {
            const { userId } = req.params;
            const updateData = req.body;
    
            const updatedUser = await this.userRepository.updateUser(userId, updateData);
            res.status(200).json({
                status: true,
                user: updatedUser
            });
        } catch (err) {
            console.error('Error while updating user: ', err);
            return res.status(500).json({
                message: 'Error while updating user',
                error: err.message
            });
        }
    }

    async deleteUser(req, res){
        try{
            const {userId} = req.params;
            const user = await this.userRepository.deleteUser(userId);
            res.status(201).json({
                status: true,
                user
            })
        }catch(err){
            console.error('Error while deleting user: ', err);
            return res.status(500).json({
                message: 'Error while deleting user',
                error: err.message
            })
        }
    }
}
