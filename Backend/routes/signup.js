import express from "express"


const router=express()

router.get("/signup",(req,res)=>{
    res.send("U are in the signup page")
})

export default router