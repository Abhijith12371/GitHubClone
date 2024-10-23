import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    username: {
        type: String,
    },
    profileUrl: {
        type: String,
    },
    avatarUrl: {
        type: String,
        required: true
    },
    likedProfiles: [{
        type: String, // Change from Date to String
    }],
    likedBy: [{
        username: String, // Assuming likedBy contains the username of people who liked the profile
        avatarUrl: String,
        likedDate: { type: Date, default: Date.now } // Keep the date for when the profile was liked
    }]
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
