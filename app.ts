import 'dotenv/config'
import express from 'express'
import {connect} from 'mongoose'
import cors from 'cors'

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
// Get figure by fields
import figureRoute from './routes/figure'
app.use('/figure',figureRoute)

// Authentication
import authenticateRoute from './routes/authenticate'
app.use('/authenticate',authenticateRoute)

// Connect to db
run()
async function run(){
    try{
        await connect(process.env.DB_CONNECT!)
        console.log("Connected to the database")
    }catch(error:any){
        console.error({
            error:error.message,
            message:"Can't connect to database"})
    }
}

app.listen(port)




