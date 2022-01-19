const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const checkDietitian = require("../middleware/checkDietitian")
const router = express.Router()
const validateBody = require("../middleware/validateBody")
const { Dietitian, loginJoi ,dietitienEditJoi} = require("../models/Dietitian")
const checkId = require("../middleware/checkId")
const { Ingredient, ingredientAddJoi, ingredientEditJoi } = require("../models/Ingredient")

///////////LOGIN Dietitians
router.post("/login", validateBody(loginJoi), async (req, res) => {
  try {
    const { employeeId, password } = req.body

    const dietitan = await Dietitian.findOne({ employeeId })
    if (!dietitan) return res.status(404).send("dietitan not found")

    const valid = await bcrypt.compare(password, dietitan.password)
    if (!valid) return res.status(400).send(" password incorrect")

    const token = jwt.sign({ id: dietitan._id }, process.env.JWT_SECRET_KEY, { expiresIn: "15d" })
    res.send(token)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

///get profile Dietitians
router.get("/profile", checkDietitian, async (req, res) => {
  const dietitian = await Dietitian.findById(req.dietitianId).select("-__v -password")
  res.json(dietitian)
})

//put Dietitian
router.put("/profile/:id", checkDietitian,checkId, validateBody(dietitienEditJoi), async (req, res) => {
  try {
    const { firstName,lastName,avatar, phone, email, password } = req.body
    let hash
    if (password) {
      const salt = await bcrypt.genSalt(10)
      hash = await bcrypt.hash(password, salt)
    }

    const dietitian = await Dietitian.findByIdAndUpdate(
      req.params.id,
      { $set: {firstName,lastName, avatar, phone, email, password:hash } },
      { new: true }
    )

    if (!dietitian) return res.status(404).send("dietitian not found")
    res.json(dietitian)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

/////************************ Add Ingredients*****************************************/////
/////get Ingredients
router.get("/ingredients", async (req, res) => {
  const ingredient = await Ingredient.find().select("-__v ")
  res.json(ingredient)
})
//Add Ingredients
router.post("/ingredients", checkDietitian, validateBody(ingredientAddJoi), async (req, res) => {
  try {
    const { name, image, description, calories, types } = req.body

    const ingredient = new Ingredient({
      name,
      image,
      description,
      calories,
      types,
    })
    await ingredient.save()
    res.json(ingredient)
  } catch (error) {
    res.status(500).send(error.message)
  }
})
///Edit ingredients
router.put("/ingredients/:id", checkDietitian, checkId, validateBody(ingredientEditJoi), async (req, res) => {
  try {
    const { name, image, description, calories, types } = req.body

    const ingredient = await Ingredient.findByIdAndUpdate(
      req.params.id,
      { $set: { name, image, description, calories, types } },
      { new: true }
    )

    if (!ingredient) return res.status(404).send("Ingredient not found")
    res.json(ingredient)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

/////////// Delete ingredients

router.delete("/ingredients/:id", checkDietitian, checkId, async (req, res) => {
  try {
    const ingredient = await Ingredient.findByIdAndRemove(req.params.id)
    if (!ingredient) return res.status(404).send("ingredient is not Found")

    res.json("ingredient is removed")
  } catch (error) {
    res.status(500).send(error.message)
  }
})

module.exports = router
