import express from 'express';
import { login, logout, signUp } from '../controllers/authControllers.js';


const route=express.Router();   

route.post('/signup',signUp); 
route.post('/login',login); 
route.post('/logout',logout); 



export default route; 
