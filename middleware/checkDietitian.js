const jwt = require("jsonwebtoken")
const { Dietitian } = require("../models/Dietitian")

const checkDietitian = async (req, res, next) => {
  try {
    const token = req.header("Authorization")
    if (!token) return res.status(401).send("token is missing")

    const decryptedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
    const dietitianId = decryptedToken.id

    const dietitianFound = await Dietitian.findById(dietitianId)

    if (!dietitianFound) return res.status(404).send("you are not Dietitian")

    req.dietitianId = dietitianId

    next()
  } catch (error) {
    console.log(error)
    res.status(500).send(error.message)
  }
}
module.exports = checkDietitian
