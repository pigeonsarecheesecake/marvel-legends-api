import 'dotenv/config'
import express from 'express'
import {connect} from 'mongoose'

const app = express()
const port = 3000

// Get figure by fields
import figure from './routes/figure'
app.use('/figure',figure)

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




