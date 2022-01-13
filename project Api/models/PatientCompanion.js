const mongoose = require("mongoose")
const Joi = require("joi")

const patientCompanionSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  avatar: String,
  password: String,
  fileNumber:String,
 
  meals: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Meal",
    },
  ],
})

const signupJoi = Joi.object({
  firstName: Joi.string().min(1).max(50).required(),
  lastName: Joi.string().min(1).max(50).required(),
  email: Joi.string().email().required(),
  avatar: Joi.string().uri().min(6).max(1000).required(),
  password: Joi.string().min(6).max(100).required(),
  fileNumber: Joi.string().min(10).required(),
})
const loginJoi = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(50).required(),
})

const profileJoi = Joi.object({
  firstName: Joi.string().min(2).max(50).required(),
  lastName: Joi.string().min(2).max(50).required(),
  avatar: Joi.string().uri().min(6).max(1000).required(),
  email: Joi.string().email().required(),
  fileNumber: Joi.string().min(10).required(),

  password: Joi.string().min(6).max(50).required(),
})

const companionEditJoi = Joi.object({
  firstName: Joi.string().min(1).max(50),
  lastName: Joi.string().min(1).max(50),
  email: Joi.string().email(),
  avatar: Joi.string().uri().min(6).max(1000),
  password: Joi.string().min(6).max(100).allow(""),
  fileNumber: Joi.string().min(10).required(),

})

const PatientCompanion = mongoose.model("PatientCompanion", patientCompanionSchema)
module.exports.PatientCompanion = PatientCompanion
module.exports.signupJoi = signupJoi
module.exports.loginJoi = loginJoi
module.exports.profileJoi = profileJoi
module.exports.companionEditJoi = companionEditJoi
