const mongoose = require("mongoose")
const Joi = require("joi")

const dietitanSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  avatar: String,
  employeeId: String,
  password: String,
  phone: String,
  meals:[
    {
        type: mongoose.Types.ObjectId,
        ref: "Meal",
    },
  ],                                   

})

////////Add Dietitians
const dietitianAddJoi = Joi.object({
  firstName: Joi.string().min(1).max(50).required(),
  lastName: Joi.string().min(1).max(50).required(),
  email: Joi.string().email(),
  employeeId: Joi.string().max(10).required(),
  avatar: Joi.string().uri().min(6).max(1000).required(),
  phone:Joi.string().max(10),
  password: Joi.string().min(6).max(100).required(),
})

const loginJoi = Joi.object({
  employeeId: Joi.string().max(10).required(),
  password: Joi.string().required(),
})

const profileJoi = Joi.object({
    firstName: Joi.string().min(1).max(50).required(),
    lastName: Joi.string().min(1).max(50).required(),
    email: Joi.string().email(),
    employeeId: Joi.string().max(10).required(),
    avatar: Joi.string().uri().min(6).max(1000).required(),
    phone:Joi.string().max(10),
    password: Joi.string().min(6).max(100).required(),

})

const admindietitienEditJoi = Joi.object({
  firstName: Joi.string().min(1).max(50),
  lastName: Joi.string().min(1).max(50),
  email: Joi.string().email(),
  employeeId: Joi.string().max(10),
  avatar: Joi.string().uri().min(6).max(1000),
  phone:Joi.string().max(10),
  password: Joi.string().min(6).max(100),
})
const dietitienEditJoi = Joi.object({
  email: Joi.string().email(),
  avatar: Joi.string().uri().min(6).max(1000),
  phone:Joi.string().max(10),
  password: Joi.string().min(6).max(100),
})
const Dietitian = mongoose.model("Dietitan", dietitanSchema)
module.exports.Dietitian = Dietitian
module.exports.dietitianAddJoi = dietitianAddJoi
module.exports.dietitienEditJoi = dietitienEditJoi
module.exports.admindietitienEditJoi = admindietitienEditJoi

module.exports.loginJoi = loginJoi
module.exports.profileJoi = profileJoi
