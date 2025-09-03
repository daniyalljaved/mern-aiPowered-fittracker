import express from 'express';
import { get } from 'mongoose';
import auth from '../middlewares/auth.js';
import { createWorkout, getWorkout, updateWorkout ,deleteWorkout,getOneWorkout} from '../controllers/workoutControllers.js';
const router=express.Router();



router.get('/',auth,getWorkout)
router.get('/:id',auth,getOneWorkout)
router.post('/',auth,createWorkout)
router.put('/:id',auth,updateWorkout)
router.delete('/:id',auth,deleteWorkout)


export default router;
