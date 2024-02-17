// dotenv
import 'dotenv/config'

// Action figure schema
import actionFigureModel from './models/actionFigure'
// const actionFigureModel = require('./models/actionFigure')

// Import express
import express from 'express'
const app = express()

// import mongoose
import {connect} from 'mongoose'

// port
const port = 3000

// Middlewares
// Converts payload to json
app.use(express.json())

// Querying
app.get('/', async(req,res)=>{
    try{
        const figures = await actionFigureModel.find({name:"Iron Man"})
        res.json(figures)
        console.log(figures)
    }catch(err){
        res.status(500).json({error:'Failed'})
    }
})

// Connect to db
run()
// connect(process.env.DB_CONNECT!).then(()=>console.log("Connected to db")).catch(error => console.log(error));
 async function run(){
    try{
        await connect(process.env.DB_CONNECT!)
        console.log("connected")
    }catch(err){
        console.log(err)
    }
}




app.listen(port)




