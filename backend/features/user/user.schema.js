import mongoose from "mongoose";
import bcrypt from "bcryptjs"; // For password hashing
import { v4 as uuidv4 } from 'uuid';

const UserSchema = new mongoose.Schema({
    empId: {type: String, unique: true},
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: {type: String, unique: true},
    email: { type: String, required: true, unique: true },
    mobileNo: {type: String, required: true},
    password: { type: String },
    joiningDate: {
        type: Date,
        default: Date.now
      },
    role: { type: String, enum: ['User', 'Admin'], default: 'User' },
    position: {type: String, enum: ['Super Admin', 'HR Admin', 'Admin', 'Employee'], default: 'Employee'},
    oauthProvider: { type: String, enum: ['google', 'local'], default: 'local' },
    oauthId: { type: String }, // This will store Google OAuth user ID
    profileImg: { type: String },
    lastLogin: { type: Date, default: Date.now }
});

// Hash password before saving the user to DB
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    this.firstName = this.firstName.trim();
    this.lastName = this.lastName.trim();

    if (!this.empId) {
        this.empId = uuidv4(); // Generate a unique ID
    }

    next();
});

// Compare entered password for login
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

export const UserModel = mongoose.model('User', UserSchema);
