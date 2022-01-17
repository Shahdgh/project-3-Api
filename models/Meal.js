const mongoose = require("mongoose")
const Joi = require("joi")

////Meals
const mealSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Types.ObjectId,
    ref: "Patient",
  },
  employee: {
    type: mongoose.Types.ObjectId,
    ref: "Employee",
  },
  patientCompanion: {
    type: mongoose.Types.ObjectId,
    ref: "PatientCompanion",
  },
  ingredients: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Ingredient",
    },
  ],
  comment: String,
  status: {
    type: String,
    enum: ["Accept", "Pending", "Refused"],
    default: "Accept",
  },
})
//meal by patient
const mealPatientAddJoi = Joi.object({
  ingredients: Joi.array().items(Joi.objectid()).required(),
})


const mealDietitianEditJoi = Joi.object({
  comment: Joi.string().min(3).max(300).allow(""),
  status: Joi.string().valid("Accept", "Pinned", "Refused"),
})

const Meal = mongoose.model("Meal", mealSchema)

module.exports.Meal = Meal
module.exports.mealPatientAddJoi = mealPatientAddJoi

module.exports.mealDietitianEditJoi = mealDietitianEditJoi
