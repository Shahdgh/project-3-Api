const mongoose = require("mongoose")
const Joi = require("joi")

const typeSchema = mongoose.Schema({
  name: String,
})

const typeAddJoi = Joi.object({
  name: Joi.string().min(3).max(1000).required(),
})

const typeEditJoi = Joi.object({
  name: Joi.string().min(3).max(1000),
})
const Type = mongoose.model("Type", typeSchema)

module.exports.Type = Type
module.exports.typeAddJoi = typeAddJoi
module.exports.typeEditJoi = typeEditJoi
