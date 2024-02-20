import 'dotenv/config'
import actionFigureModel from './models/actionFigure'
import express from 'express'
import {connect} from 'mongoose'

const app = express()
const port = 3000

// Middlewares
app.use(express.json())
// Get figures by name
import figure from './routes/figure'
app.use('/figure',figure)

// Get figures by series
import series from './routes/series'
app.use('/series',series)

// Route to get all action figures
app.get('/all', async(req,res)=>{
    try{
        const figures = await actionFigureModel.find()
        res.json(figures)
    }catch(err){
        res.status(500).json({error:'Failed'})
    }
})

// Get
app.get('/character/:character', async(req,res)=>{
    try{
        const figures = await actionFigureModel.find({character:req.params.character})
        res.json(figures)
    }catch(err){
        res.status(500).json({error:'Failed'})
    }
})

// Connect to db
run()
async function run(){
    try{
        await connect(process.env.DB_CONNECT!)
        console.log("Connected to the database")
    }catch(err){
        console.log(err)
    }
}

app.listen(port)




