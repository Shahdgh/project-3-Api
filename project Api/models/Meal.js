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
const mealPatientEditJoi = Joi.object({
  ingredients: Joi.array().items(Joi.objectid()),
})
////Employ
// const mealEmployeeAddJoi = Joi.object({
//   ingredients: Joi.array().items(Joi.objectid()).required(),
// })
// const mealEmployeeEditJoi = Joi.object({
//   ingredients: Joi.array().items(Joi.objectid()),
// })

// const mealCompanionAddJoi = Joi.object({
//   ingredients: Joi.array().items(Joi.objectid()).required(),
// })
////////Companion
// const mealCompanionEditJoi = Joi.object({
//   ingredients: Joi.array().items(Joi.objectid()),
// })

const mealDietitianEditJoi = Joi.object({
  comment: Joi.string().min(3).max(300),
  status: Joi.string().valid("Accept", "Pinned", "Refused"),
})

const Meal = mongoose.model("Meal", mealSchema)

module.exports.Meal = Meal
module.exports.mealPatientAddJoi = mealPatientAddJoi
// module.exports.mealEmployeeAddJoi = mealEmployeeAddJoi
// module.exports.mealCompanionAddJoi = mealCompanionAddJoi

// module.exports.mealPatientEditJoi = mealPatientEditJoi
// module.exports.mealEmployeeEditJoi = mealEmployeeEditJoi
// module.exports.mealCompanionEditJoi = mealPatientEditJoi
module.exports.mealDietitianEditJoi = mealDietitianEditJoi
