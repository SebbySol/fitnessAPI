const Workout = require("../models/Workout");

// Add Workout
module.exports.addWorkout = (req, res) => {
  let newWorkout = new Workout({
    name: req.body.name,
    duration: req.body.duration,
    userId: req.user.id
  });

  newWorkout.save()
    .then((workout) => res.status(201).send({ message: "Workout added successfully", workout }))
    .catch((err) => res.status(500).send({ error: "Error in Save", details: err }));
};

// Get My Workouts
module.exports.getWorkouts = (req, res) => {
  Workout.find({ userId: req.user.id })
    .then((workouts) => res.status(200).send({ workouts }))
    .catch((err) => res.status(500).send({ error: "Error in Find", details: err }));
};