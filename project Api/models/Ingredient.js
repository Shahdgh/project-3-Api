
const mongoose = require("mongoose")
const Joi = require("joi")


const ingredientSchema = new mongoose.Schema({
    name:String,
    description:String,
    image:String,
    calories:Number,
    types:[
      {
        type: mongoose.Types.ObjectId,
        ref: "Type",
      }
    ],
  
  })
//////////////Add Ingredient
const ingredientAddJoi = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    description: Joi.string().min().max(2000).allow(""),
    image: Joi.string().uri().min(3).max(1000).required(),
    calories: Joi.number().min(1).max(1000),
    types: Joi.array().items(Joi.objectid()).min(1).required(),
  })
  //////////////Edit Ingredient
  const ingredientEditJoi = Joi.object({
    name: Joi.string().min(2).max(50),
    description: Joi.string().min(5).max(2000).allow(""),
    image: Joi.string().uri().min(3).max(1000),
    calories: Joi.number().min(1).max(1000),
    types: Joi.array().items(Joi.objectid()).min(1),

  })

  const Ingredient = mongoose.model("Ingredient", ingredientSchema)

module.exports.Ingredient = Ingredient
module.exports.ingredientAddJoi = ingredientAddJoi
module.exports.ingredientEditJoi = ingredientEditJoi