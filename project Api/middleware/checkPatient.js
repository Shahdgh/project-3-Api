
const jwt = require("jsonwebtoken")
const { Patient } = require("../models/Patient")

const checkPatient = async (req, res, next) => {
  try {
    const token = req.header("Authorization")
    if (!token) return res.status(401).send("token is missing")

    const decryptedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
    const patientId = decryptedToken.id

    const patientFound = await Patient.findById(patientId)

    if (!patientFound) return res.status(404).send("you are not Patient")

    req.patientId = patientId

    next()
  } catch (error) {
    console.log(error)
    res.status(500).send(error.message)
  }
}
module.exports = checkPatient