import mongoose from "mongoose";

const url = "mongodb+srv://adityaeducation212:adityadb212@cluster0.jm0dl8u.mongodb.net/pranjalCRM?retryWrites=true&w=majority&appName=Cluster0";
// const url = "mongodb://127.0.0.1:27017/pranjalCRM";

export const connectUsingMongoose = async () => {
    try{
        await mongoose.connect(url);
        console.log('MongoDB is connected using mongoose');
        // await dropIndex();
    }catch(err){
        console.log('Error while connecting to DB: ' + err);
    }
}