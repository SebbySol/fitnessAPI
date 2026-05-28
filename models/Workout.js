const mongoose = require("mongoose");

// users workout logs
const workoutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  duration: { type: Number, required: true },
  userId: { type: String, required: true },
  dateAdded: { type: Date, default: Date.now },
  status: { type: String, default: "pending" }
});

module.exports = mongoose.model("Workout", workoutSchema);