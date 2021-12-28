const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const router = express.Router()
const validateBody = require("../middleware/validateBody")
const checkPatient = require("../middleware/checkPatient")

const { Patient,loginJoi ,patientEditJoi} = require("../models/Patient")
const checkId = require("../middleware/checkId")


///////////LOGIN Patient
router.post("/login", validateBody(loginJoi), async (req, res) => {
  try {
    const { fileNumber, password } = req.body

    const patient = await Patient.findOne({ fileNumber })
    if (!patient) return res.status(404).send("patient not found")

    const valid = await bcrypt.compare(password, patient.password)
    if (!valid) return res.status(400).send("password incorrect")

    const token = jwt.sign({ id: patient._id }, process.env.JWT_SECRET_KEY, { expiresIn: "15d" })
    res.send(token)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

///get profile Patient
router.get("/profile", checkPatient, async (req, res) => {
  const patient = await Patient.findById(req.patientId).select("-__v -password")
  res.json(patient)
})


//put patient
router.put("/:id", checkPatient,checkId, validateBody(patientEditJoi), async (req, res) => {
    try {
      const { avatar, phone, email, password } = req.body
  
      const patient = await Patient.findByIdAndUpdate(
        req.params.id,
        { $set: { avatar, phone, email, password } },
        { new: true }
      )
  
      if (!patient) return res.status(404).send("Patient not found")
      res.json(patient)
    } catch (error) {
      res.status(500).send(error.message)
    }
  })
module.exports = router