const express = require("express")
const checkCompanion = require("../middleware/checkCompanion")
const checkDietitian = require("../middleware/checkDietitian")
const checkEmployee = require("../middleware/checkEmployee")
const checkId = require("../middleware/checkId")
const checkPatient = require("../middleware/checkPatient")
const validateBody = require("../middleware/validateBody")
const { Dietitian } = require("../models/Dietitian")
const { Employee } = require("../models/Employee")
const { Ingredient } = require("../models/Ingredient")
const { Meal, mealPatientAddJoi, mealEmployeeAddJoi, mealDietitianEditJoi } = require("../models/Meal")
const { Patient } = require("../models/Patient")
const { PatientCompanion } = require("../models/PatientCompanion")
const router = express.Router()

/////get meal
router.get("/", async (req, res) => {
  try {
    const meal = await Meal.find().populate("patient").populate("ingredients").select("-__v")
    res.json(meal)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.put("/patient/:id", checkId, checkDietitian, validateBody(mealDietitianEditJoi), async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id)
    if (!meal) return res.status(404).send("meal not found")

    const { status, comment } = req.body
    await Meal.findByIdAndUpdate(req.params.id, { $set: { status, comment } })
    res.json(meal)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.get("/patient", checkDietitian, async (req, res) => {
  try {
    const meal = await Meal.find({ patient: { $exists: true } })
      .populate("patient")
      .populate("ingredients")
      .select("-__v")

    res.json(meal)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.post("/patient", checkPatient, async (req, res) => {
  try {
    const { ingredients } = req.body

    const ingredientsSet = new Set(ingredients)
    if (ingredientsSet.size < ingredients.length) return res.status(400).send("there is duplicat ingredients")
    const ingredientsFound = await Ingredient.find({ _id: { $in: ingredients } })
    if (ingredientsFound.length < ingredients.length)
      return res.status(404).send("some of the ingredients is not found")

    const meal = new Meal({
      patient: req.patientId,
      ingredients,
      status: "Pending",
    })
    // await Dietitian.findByIdAndUpdate()
    await Patient.findByIdAndUpdate(req.patientId, { $push: { meals: meal._id } })

    await meal.save()
    res.json(meal)
  } catch (error) {
    res.status(500).send(error.message)
  }
})
router.post("/employee", checkEmployee, async (req, res) => {
  try {
    const { ingredients } = req.body
    const ingredientsSet = new Set(ingredients)
    if (ingredientsSet.size < ingredients.length) return res.status(400).send("there is duplicat ingredients")
    const ingredientsFound = await Ingredient.find({ _id: { $in: ingredients } })
    if (ingredientsFound.length < ingredients.length)
      return res.status(404).send("some of the ingredients is not found")
    const meal = new Meal({
      employee: req.employeeId,
      ingredients,
      status: "Accept",
    })

    await Employee.findByIdAndUpdate(req.employeeId, { $push: { meals: meal._id } })
    await meal.save()
    res.json(meal)
  } catch (error) {
    res.status(500).send(error.message)
  }
})
router.post("/companion", checkCompanion, async (req, res) => {
  try {
    const { ingredients } = req.body
    const ingredientsSet = new Set(ingredients)
    if (ingredientsSet.size < ingredients.length) return res.status(400).send("there is duplicat ingredients")
    const ingredientsFound = await Ingredient.find({ _id: { $in: ingredients } })
    if (ingredientsFound.length < ingredients.length)
      return res.status(404).send("some of the ingredients is not found")
    const meal = new Meal({
      companion: req.companionId,
      ingredients,
      status: "Accept",
    })
    await PatientCompanion.findByIdAndUpdate(req.companionId, { $push: { meals: meal._id } }) /// بروفاسل عشان تعرض الميل لالخاصه بكل

    await meal.save()
    res.json(meal)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

module.exports = router