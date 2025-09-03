import Workout from '../models/workout.model.js';
export const getWorkout = async (req, res) => {

    try {
        const workouts = await Workout.find({ user: req.user.id }).sort({ date: -1 });
        res.json(workouts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
export const createWorkout = async (req, res) => {
    try {
        const { title, type, exercises, notes } = req.body;

        const newWorkout = new Workout({
            user: req.user.id,
            title,
            type,
            exercises,
            notes,
        });

        const savedWorkout = await newWorkout.save();
        res.status(201).json(savedWorkout);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
export const updateWorkout = async (req, res) => {
    try {
        const { title, type, exercises, notes } = req.body;

        const workout = await Workout.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            { title, type, exercises, notes },
            { new: true }
        );

        if (!workout) return res.status(404).json({ msg: "Workout not found" });

        res.json(workout);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
export const deleteWorkout = async (req, res) => {
    try {
        const workout = await Workout.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        if (!workout) return res.status(404).json({ msg: "Workout not found" });

        res.json({ msg: "Workout deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}     