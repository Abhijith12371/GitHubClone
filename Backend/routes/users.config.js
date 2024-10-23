import express from "express"
import userProfileAndRepo from "../controllers/userProfile.js"
// import LikeProfile from "../../frontend/src/components/LikeProfile.jsx"
import { likeProfile,getLikes } from "../controllers/user.controller.js"
import { ensureAuthenticated } from "../middleware/ensureAuthenticated.js";


const router=express()

router.get("/profile/:username",userProfileAndRepo)
router.get("/likes", ensureAuthenticated, getLikes);
router.post("/like/:username",ensureAuthenticated,likeProfile)

export default router

