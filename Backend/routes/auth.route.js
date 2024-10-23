import express from "express"
import passport from "passport"
const router=express()


router.get('/github',
    passport.authenticate('github', { scope: [ 'user:email' ] }),
    function(req, res){
    })
      // The request will be redirected to GitHub for authentication, so this
      //
router.get('/github/callback', 
passport.authenticate('github', { failureRedirect: '/login' }),
function(req, res) {
    res.redirect(process.env.SERVER_BASE_URL);
});

router.get("/check", (req, res) => {
    console.log("Authenticated User:", req.user); // Log the authenticated user
    if (req.isAuthenticated()) {
        res.send({ user: req.user });
    } else {
        res.send({ user: null });
    }
});

// In your auth.route.js or a separate logout.js file
router.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: "Logout failed", error: err });
        }
        res.status(200).json({ message: "Logout successful" });
    });
});


export default router