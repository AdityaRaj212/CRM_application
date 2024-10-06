import { UserModel } from './user.schema.js';

export default class UserRepository {

    async allUsers(){
        try{
            const users = await UserModel.find();
            return users;
        }catch(err){
            console.error('Error while fetching all users: ', err);
            throw new Error(err);
        }
    }

    async addUser(name, email, password, profileImg, oauthProvider = 'local', oauthId = null) {
        try {
            const newUser = new UserModel({
                name,
                email,
                password,
                joiningDate: new Date(),
                profileImg,
                oauthProvider,
                oauthId
            });
            await newUser.save();
            return newUser;
        } catch (err) {
            console.log('Error while creating user: ', err);
            throw new Error(err);
        }
    }

    async findByEmail(email) {
        try {
            const user = await UserModel.findOne({ email });
            return user;
        } catch (err) {
            console.log('Error while fetching user: ', err);
            throw new Error(err);
        }
    }

    async findByOAuthId(oauthId) {
        try {
            const user = await UserModel.findOne({ oauthId });
            return user;
        } catch (err) {
            console.log('Error while fetching user by OAuth ID: ', err);
            throw new Error(err);
        }
    }

    async findUserById(userId){
        try{
            const user = await UserModel.findById(userId);
            return user;
        }catch(err){
            console.log('Error while fetching user with id: ', err);
            throw new Error(err);
        }
    }

    // Update user
    async updateUser(userId, updateData) {
        try {
            const updatedUser = await UserModel.findByIdAndUpdate(
                userId,
                { $set: updateData },
                { new: true }
            );
            if (!updatedUser) {
                throw new Error(`User with ID ${userId} not found`);
            }
            return updatedUser;
        } catch (err) {
            console.log('Error while updating user: ', err);
            throw new Error(err);
        }
    }

    // Delete user
    async deleteUser(userId) {
        try {
            const deletedUser = await UserModel.findByIdAndDelete(userId);
            if (!deletedUser) {
                throw new Error(`User with ID ${userId} not found`);
            }
            return deletedUser;
        } catch (err) {
            console.log('Error while deleting user: ', err);
            throw new Error(err);
        }
    }
}
