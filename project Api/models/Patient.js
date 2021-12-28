const mongoose = require("mongoose")
const Joi = require("joi")

const patientSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  avatar: String,
  fileNumber: String,
  password: String,
  phone: String,
  age: Number,
  bloodType: String,
  weight: Number,
  height: Number,
  disease: String,
  meals:[
    {
      type: mongoose.Types.ObjectId,
      ref:"Meal"
    },
  ],
})

const patientAddJoi = Joi.object({
  firstName: Joi.string().min(1).max(50).required(),
  lastName: Joi.string().min(1).max(50).required(),
  email: Joi.string().email(),
  fileNumber: Joi.string().min(10).required(),
  avatar: Joi.string().uri().min(6).max(1000),
  password: Joi.string().min(6).max(100).required(),
  phone:Joi.string().min(10).required(),
  age:Joi.number().min(1).max(100),
  weight:Joi.number().min(1).max(400),
  height:Joi.number().min(1).max(300),
  bloodType:Joi.string().min(1).max(100),
  disease:Joi.string().min(6).max(1000).required(),
})
const loginJoi = Joi.object({
  fileNumber: Joi.string().min(10).required(),
  password: Joi.string().required(),
})

const profileJoi = Joi.object({
  firstName: Joi.string().min(1).max(50).required(),
  lastName: Joi.string().min(1).max(50).required(),
  email: Joi.string().email(),
  fileNumber: Joi.string().min(10).required(),
  avatar: Joi.string().uri().min(6).max(1000).required(),
  password: Joi.string().min(6).max(100).required(),
  phone:Joi.string().min(10).required(),
  age: Joi.number().min(1).max(100).required(),
  weight: Joi.number().min(1).max(400).required(),
  height: Joi.number().min(1).max(300).required(),
  bloodType: Joi.string().min(1).max(100).required(),
  disease: Joi.string().min(6).max(1000).required(),
})

const adminpatientEditJoi = Joi.object({
  firstName: Joi.string().min(1).max(50),
  lastName: Joi.string().min(1).max(50),
  email: Joi.string().email(),
  fileNumber: Joi.string().min(10),
  avatar: Joi.string().uri().min(6).max(1000),
  password: Joi.string().min(6).max(100),
  phone:Joi.string().min(10),
  age: Joi.number().min(1).max(100),
  weight: Joi.number().min(1).max(400),
  height: Joi.number().min(1).max(300),
  bloodType: Joi.string().min(1).max(100),
  disease: Joi.string().min(6).max(1000),
})

const patientEditJoi = Joi.object({
  email: Joi.string().email(),
  avatar: Joi.string().uri().min(6).max(1000),
  password: Joi.string().min(6).max(100),
  phone:Joi.string().min(10),
 
})


const Patient = mongoose.model("Patient", patientSchema)
module.exports.Patient = Patient
module.exports.patientAddJoi = patientAddJoi
module.exports.loginJoi = loginJoi
module.exports.profileJoi = profileJoi
module.exports.adminpatientEditJoi = adminpatientEditJoi
module.exports.patientEditJoi = patientEditJoi





