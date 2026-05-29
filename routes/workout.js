const express = require("express");
const router = express.Router();
const workoutController = require("../controllers/workout");
const auth = require("../auth");

// Add workout
router.post("/addWorkout", auth, workoutController.addWorkout);

// get workout
router.get("/getWorkouts", auth, workoutController.getWorkouts);

module.exports = router;
