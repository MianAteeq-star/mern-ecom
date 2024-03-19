import express from 'express';
import dotenv from 'dotenv'
import cors from "cors"
import morgan from "morgan"
import Mongodb from './db/Mongodb.js';
import UserRoutes from './routes/UserRoutes.js'
import CategoryRoutes from "./routes/CategoryRoutes.js"

const app = express()



// env config
dotenv.config()

// cors Middleware

app.use(cors())
app.use(express.json())
app.use(morgan("dev"))


// ROuter

app.use( UserRoutes)
app.use(CategoryRoutes)

app.get("/", (req, res) => {
    res.send("<h1>Welcome to ecommerce app</h1>");
  });





// MOngodb connection 

Mongodb()

// Port 
const PORT = process.env.PORT||  8080


app.listen(PORT, ()=>{
    console.log(`Server is running on Port ${PORT}`.bgBlue.white);
})