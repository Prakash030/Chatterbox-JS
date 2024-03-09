import express, { Express } from "express";
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from "./db";
import userRoutes from './routes/userRoutes'


const app: Express = express()
dotenv.config()
app.use(cors())
app.use(bodyParser.json({limit: "100mb"}))
app.use(bodyParser.urlencoded({limit:"50mb", extended: true}))

const PORT = process.env.PORT || 3000;

app.use('/api/auth',userRoutes)


app.listen(PORT, () => {
    connectDB()
    console.log(`App running on ${PORT} port`)
})