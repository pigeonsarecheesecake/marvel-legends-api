// dotenv
import { config } from "dotenv"

// Import express
import express from 'express'
const app = express()

// import mongoose
import mongoose from "mongoose"

// port
const port = 3000

// Routes
app.get('/',(req,res)=>{
    res.send("test")
})

app.get('/categories',(req,res)=>{
    res.send("categories")
})


app.listen(port)




