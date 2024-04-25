import 'dotenv/config'
import express from 'express'
import {connect} from 'mongoose'
import cors from 'cors'
import figureRoute from './routes/figure'
import authenticateRoute from './routes/authenticate'

// Variables
const app = express()
const port = 3000

// Middlewares (1. Allows CORS | 2. Parses incoming request objects to json | 3. Authentication route | 4. Figure search route)
app.use(cors())
app.use(express.json())
app.use('/figure',figureRoute)
app.use('/authenticate',authenticateRoute)

// Connect to database
run()
async function run(){
    try{
        await connect(process.env.DB_CONNECT!)
        console.log("Connected to the database")
    }catch(e:any){
        console.error(e.message)
    }
}

app.listen(port)




