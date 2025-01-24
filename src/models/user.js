import mongoose from "mongoose";
// Define the schema for the User collection
const userSchema = new mongoose.Schema({
    // Name of the user
    name: {
        type: String,
        required: true
    },
    // Email of the user
    email: {
        type: String,
        required: true,
        unique: true
    },
    // Password of the user
    password: {
        type: String,
        required: true
    }
    // Automatically add createdAt and updatedAt attributes
}, { timestamps: true });

// Mongoose model for the User collection in MongoDB
export const UserModel=new mongoose.model('User',userSchema)