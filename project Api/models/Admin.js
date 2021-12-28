const mongoose = require("mongoose")
const Joi = require("joi")


const AdminSchema = new mongoose.Schema({
firstName: String,
lastName: String,
email: String,
avatar: String,
password: String,      

})
//////ADMIN SIGN AND LOGIN
const  signupJoi = Joi.object({
    firstName:Joi.string().min(1).max(50).required(),
    lastName:Joi.string().min(1).max(50).required(),
    email: Joi.string().email().required(),
    avatar:Joi.string().uri().min(6).max(1000).required(),
    password:Joi.string().min(6).max(100).required(),
   
})
const  loginJoi = Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().min(6).max(50).required(),
})
const profileJoi = Joi.object({
    firstName:Joi.string().min(1).max(50).required(),
    lastName:Joi.string().min(1).max(50).required(),
    email: Joi.string().email().required(),
    avatar:Joi.string().uri().min(6).max(1000).required(),
    password:Joi.string().min(5).max(100).required(),
  })
const Admin = mongoose.model("Admin", AdminSchema)
module.exports.Admin = Admin 
module.exports.signupJoi= signupJoi
module.exports.loginJoi= loginJoi
module.exports.profileJoi= profileJoi


