
const jwt = require("jsonwebtoken")

const { Employee } = require("../models/Employee")

const checkEmployee = async (req, res, next) => {
  try {
    const token = req.header("Authorization")
    if (!token) return res.status(401).send("token is missing")

    const decryptedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
    const employeeId = decryptedToken.id

    const employeeFound = await Employee.findById(employeeId)

    if (!employeeFound) return res.status(404).send("you are not Employee")

    req.employeeId = employeeId

    next()
  } catch (error) {
    console.log(error)
    res.status(500).send(error.message)
  }
}
module.exports = checkEmployee