const jwt = require("jsonwebtoken")
const { PatientCompanion } = require("../models/PatientCompanion")


const checkCompanion = async (req, res, next) => {
  try {
    const token = req.header("Authorization")
    if (!token) return res.status(401).send("token is missing")

    const decryptedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
    const companionId = decryptedToken.id

    const companionFound = await PatientCompanion.findById(companionId)

    if (!companionFound) return res.status(404).send("you are not Companion")

    req.companionId = companionId

    next()
  } catch (error) {
    console.log(error)
    res.status(500).send(error.message)
  }
}
module.exports = checkCompanion