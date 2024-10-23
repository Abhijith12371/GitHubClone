import express from "express";
import userRoutes from "./routes/users.config.js";
import cors from "cors";
import explore from "./routes/Explore.js";
import connectDB from "./db/connect.js";
import signup from "./routes/signup.js";
import login from "./routes/login.js";
import passport from "passport";
import session from "express-session";
import github from "./routes/auth.route.js";
import "./passport/github.auth.js";
import path from "path";

const app = express();
const __dirname = path.resolve();

// CORS configuration
app.use(cors({
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true, // Allow cookies to be sent
}));

// Session and Passport setup
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

// Serve static files from the frontend/dist directory
app.use(express.static(path.join(__dirname, "..", "frontend", "dist"))); // Adjusted path

// API routes
app.use("/api/users", userRoutes);
app.use("/explore", explore);
app.use("/api/auth", signup);
app.use("/api/auth", login);
app.use("/api/auth", github);

// Catch-all route to serve index.html for React Router
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "frontend", "dist", "index.html"));
});

// Start the server and connect to the database
app.listen(5000, () => {
    connectDB();
    console.log("Server is running on port 5000");
});
