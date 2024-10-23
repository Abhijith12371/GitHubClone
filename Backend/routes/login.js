import express from "express"

const router=express()

router.get("/login",(req,res)=>{
    res.send("you are in the login page")
})

export default router