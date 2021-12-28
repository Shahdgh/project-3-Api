const express = require("express")
const router = express.Router()
const validateBody = require("../middleware/validateBody")
const checkId = require("../middleware/checkId")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const checkCompanion = require("../middleware/checkCompanion")
const { PatientCompanion,signupJoi,loginJoi,companionEditJoi } = require("../models/PatientCompanion")




///Signup 
router.post("/signup",validateBody(signupJoi), async (req, res) => {
    try {
      const { firstName, lastName,patients, email, password, avatar } = req.body
      const companionFound = await PatientCompanion.findOne({ email })
      if (companionFound) return res.status(400).send(result.error.details[10].message)
  
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(password, salt)
  
      const companion = new PatientCompanion({
        firstName,
        lastName,
        email,
        password: hash,
        avatar,
        patients,
      })
      await companion.save()
    delete companion._doc.password

    res.json(companion)
  } catch (error) {
    res.status(500).send(error.message)
  }
})
///////////LOGIN Companions
router.post("/login", validateBody(loginJoi), async (req, res) => {
    try {
      const { email, password } = req.body
  
      const companion = await PatientCompanion.findOne({ email })
      if (!companion) return res.status(404).send("Patient Companion not found")
  
      const valid = await bcrypt.compare(password, companion.password)
      if (!valid) return res.status(400).send(" password incorrect")
  
      const token = jwt.sign({ id: companion._id }, process.env.JWT_SECRET_KEY, { expiresIn: "15d" })
      res.send(token)
    } catch (error) {
      res.status(500).send(error.message)
    }
  })
//////// Profile
  router.get("/profile", checkCompanion, async (req, res) => {
    const companion = await PatientCompanion.findById(req.companionId).select("-__v -password")
    res.json(companion)
  })

  //put companion
router.put("/:id", checkCompanion, checkId, validateBody(companionEditJoi), async (req, res) => {
    try {
        const { firstName, lastName,patients, email, password, avatar } = req.body
  
      const companion = await PatientCompanion.findByIdAndUpdate(
        req.params.id,
        { $set: { firstName, lastName,patients, email, password, avatar } },
        { new: true }
      )
  
      if (!companion) return res.status(404).send("Companion not found")
      res.json(companion)
    } catch (error) {
      res.status(500).send(error.message)
    }
  })
  module.exports = router
