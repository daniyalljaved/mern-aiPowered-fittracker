import express from 'express';
import authRouter from './routes/authroute.js'; 
import workoutRouter from './routes/workoutroutes.js';
const app=express();
import dotenv from 'dotenv';
import connectDB from './db.js';
dotenv.config();


const port=process.env.PORT ;

app.use(express.json());
app.use('/api/auth',authRouter);
app.use('/api/workout',workoutRouter);



app.listen(port,()=>{
    connectDB();
    console.log(`Server is running on port ${port} `);
});