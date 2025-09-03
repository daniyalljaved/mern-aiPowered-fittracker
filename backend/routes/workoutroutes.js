import express from 'express';
import { get } from 'mongoose';
import { createWorkout, getWorkout, updateWorkout ,deleteWorkout} from '../controllers/workoutControllers.js';
const router=express.Router();



router.get('/',getWorkout)
router.post('/',createWorkout)
router.put('/:id',updateWorkout)
router.delete('/:id',deleteWorkout)


export default router;
