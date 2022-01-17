const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const router = express.Router()
const validateBody = require("../middleware/validateBody")
const checkId = require("../middleware/checkId")
const { Employee, loginJoi, employeeEditJoi } = require("../models/Employee")
const checkEmployee = require("../middleware/checkEmployee")

///////////LOGIN Employee
router.post("/login", validateBody(loginJoi), async (req, res) => {
  try {
    const { employeeId, password } = req.body

    const employee = await Employee.findOne({ employeeId })
    if (!employee) return res.status(404).send("employee not found")

    const valid = await bcrypt.compare(password, employee.password)
    if (!valid) return res.status(400).send(" password incorrect")

    const token = jwt.sign({ id: employee._id }, process.env.JWT_SECRET_KEY, { expiresIn: "15d" })
    res.send(token)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

///get profile Employee
router.get("/profile", checkEmployee, async (req, res) => {
  const employee = await Employee.findById(req.employeeId).select("-__v").populate({
    path: "meals",
    populate: "ingredients",
  })
  res.json(employee)
})

//put employee
router.put("/profile/:id", checkEmployee, checkId, validateBody(employeeEditJoi), async (req, res) => {
  try {
    const { firstName, lastName, avatar, phone, email, password } = req.body
    let hash
    if (password) {
      const salt = await bcrypt.genSalt(10)
      hash = await bcrypt.hash(password, salt)
    }

    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { $set: { firstName, lastName, avatar, phone, email, password: hash } },
      { new: true }
    )

    if (!employee) return res.status(404).send("employee not found")
    res.json(employee)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

module.exports = router
