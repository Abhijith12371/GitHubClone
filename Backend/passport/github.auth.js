import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import dotenv from "dotenv"
import User from "../models/User.js";

dotenv.config()

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });


  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_SECRET_ID,
    callbackURL: "/api/auth/github/callback"
},
async function(accessToken, refreshToken, profile, done) {
    process.nextTick(async function () {
        console.log("GitHub Profile:", profile); // Log profile for debugging
        const user = await User.findOne({ username: profile.username });
        if (!user) {
            const newUser = new User({
                name: profile.displayName,
                username: profile.username || profile.id, // Use profile.id if username is undefined
                profileUrl: profile.profileUrl,
                avatarUrl: profile.photos[0].value,
                likedProfiles: [],
                likedBy: []
            });
            await newUser.save();
            return done(null, newUser);
        } else {
            return done(null, user);
        }
    });
}));

