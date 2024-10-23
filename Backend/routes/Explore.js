import express from "express"
import exploreRepos from "../controllers/exploreRepos.js"

const explore=express()

explore.get("/:language",exploreRepos)

export default explore