import express from 'express';
import authRouter from './routes/authroute.js'; 
const app=express();
import dotenv from 'dotenv';
import connectDB from './db.js';
dotenv.config();


const port=process.env.PORT ;

app.use(express.json());
app.use('/api/auth',authRouter);



app.listen(port,()=>{
    connectDB();
    console.log(`Server is running on port ${port} `);
});