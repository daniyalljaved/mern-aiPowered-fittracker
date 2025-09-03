import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  title: { 
    type: String, 
    required: true 
  }, // e.g., "Chest Day", "5k Run"
  type: { 
    type: String, 
    enum: ["strength", "cardio", "flexibility", "mixed"], 
    default: "strength" 
  },
  exercises: [
    {
      name: { type: String, required: true }, // e.g., Bench Press, Push Ups
      sets: { type: Number, default: 0 },
      reps: { type: Number, default: 0 },
      duration: { type: Number, default: 0 } // for cardio (in minutes)
    }
  ],

  date: { 
    type: Date, 
    default: Date.now 
  }
}, { timestamps: true });

export default mongoose.model("Workout", workoutSchema);
