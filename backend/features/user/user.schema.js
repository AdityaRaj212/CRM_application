import mongoose from "mongoose";
import bcrypt from "bcryptjs"; // For password hashing

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    joiningDate: {
        type: Date,
        default: Date.now
      },
    role: { type: String, enum: ['User', 'Admin'], default: 'User' },
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
    next();
});

// Compare entered password for login
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

export const UserModel = mongoose.model('User', UserSchema);
