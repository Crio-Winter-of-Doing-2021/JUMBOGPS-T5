import * as dotenv from 'dotenv';
dotenv.config()

import express from 'express'
import bodyParser, {json} from 'body-parser'
import mongoose from 'mongoose'
import { authRoute } from './routes/auth'
import { assetRoute } from './routes/asset';

const app = express()

app.use(express.json())
app.use('/api', authRoute)
app.use('/api', assetRoute)

app.get('/', (req, res)=>{
    res.send("hello")
}) 

//DATABASE
const databaseUrl = "mongodb://localhost:27017/jumbotail"
mongoose
  .connect(databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })


app.listen(8000, ()=>{
    console.log("Server is running")
})