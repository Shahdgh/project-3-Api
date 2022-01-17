const mongoose = require("mongoose")
const Joi = require("joi")

const employeeSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  avatar: String,
  employeeId: String,
  password: String,
  phone: String,
  job: String,
  
  meals:[
    {
      type: mongoose.Types.ObjectId,
      ref:"Meal"
    },
  ],
})
///////////Add Employee
const employeeAddJoi = Joi.object({
  firstName: Joi.string().min(1).max(50).required(),
  lastName: Joi.string().min(1).max(50).required(),
  email: Joi.string().email(),
  employeeId: Joi.string().max(10).required(),
  avatar: Joi.string().uri().min(6).max(1000).required(),
  password: Joi.string().min(6).max(100).required(),
  job: Joi.string().min(2).max(20).required(),
  phone: Joi.string().max(10),

})

const loginJoi = Joi.object({
    employeeId: Joi.string().max(10).required(),
    password: Joi.string().required(),
})

const profileJoi = Joi.object({
  firstName: Joi.string().min(1).max(50).required(),
  lastName: Joi.string().min(1).max(50).required(),
  email: Joi.string().email(),
  employeeId: Joi.number().min(10).max(20).required(),
  avatar: Joi.string().uri().min(6).max(1000).required(),
  password: Joi.string().min(6).max(100).required(),
  job: Joi.string().min(2).max(20).required(),
  phone: Joi.string().max(10).required(),
})

const adminemployeeEditJoi = Joi.object({
    firstName: Joi.string().min(1).max(50),
    lastName: Joi.string().min(1).max(50),
    email: Joi.string().email(),
    employeeId: Joi.string().max(10),
    avatar: Joi.string().uri().min(6).max(1000),
    password: Joi.string().min(6).max(100).allow(""),
    job: Joi.string().min(2).max(20),
    phone: Joi.string().max(10),
  })
  const employeeEditJoi = Joi.object({
    firstName: Joi.string().min(1).max(50),
    lastName: Joi.string().min(1).max(50),
    email: Joi.string().email(),
    avatar: Joi.string().uri().min(6).max(1000),
    password: Joi.string().min(6).max(100).allow(""),
    phone: Joi.string().max(10),
  })
const Employee = mongoose.model("Employee", employeeSchema)
module.exports.Employee = Employee
module.exports.employeeAddJoi = employeeAddJoi
module.exports.employeeEditJoi = employeeEditJoi
module.exports.adminemployeeEditJoi = adminemployeeEditJoi

module.exports.loginJoi = loginJoi
module.exports.profileJoi = profileJoi
