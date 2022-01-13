const express = require("express")
const jwt = require("jsonwebtoken")
const router = express.Router()
const bcrypt = require("bcrypt")
const { Admin, signupJoi, loginJoi } = require("../models/Admin")
const checkAdmin = require("../middleware/checkAdmin")
const validateBody = require("../middleware/validateBody")
const { Patient, patientAddJoi, adminpatientEditJoi } = require("../models/Patient")
const checkId = require("../middleware/checkId")
const { Ingredient, ingredientAddJoi, ingredientEditJoi } = require("../models/Ingredient")

const { Dietitian, dietitianAddJoi, admindietitienEditJoi } = require("../models/Dietitian")
const { Employee, employeeAddJoi, adminemployeeEditJoi } = require("../models/Employee")

///Signup admin
router.post("/signup", validateBody(signupJoi), async (req, res) => {
  try {
    const { firstName, lastName, email, password, avatar } = req.body
    const adminFound = await Admin.findOne({ email })
    if (adminFound) return res.status(400).send(result.error.details[10].message)

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const admin = new Admin({
      firstName,
      lastName,
      email,
      password: hash,
      avatar,
    })

    await admin.save()
    delete admin._doc.password

    res.json(admin)
  } catch (error) {
    res.status(500).send(error.message)
  }
})
///////////LOGIN ADMIN
router.post("/login", validateBody(loginJoi), async (req, res) => {
  try {
    const { email, password } = req.body

    const admin = await Admin.findOne({ email })
    if (!admin) return res.status(404).send("admin not found")

    const valid = await bcrypt.compare(password, admin.password)
    if (!valid) return res.status(400).send(" password incorrect")

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET_KEY, { expiresIn: "15d" })
    res.send(token)
  } catch (error) {
    res.status(500).send(error.message)
  }
})
/////get Admin
router.get("/", async (req, res) => {
  const admin = await Admin.find().select("-__v -password")
  res.json(admin)
   
})
/////profile Admin
router.get("/profile", checkAdmin, async (req, res) => {
  const admin = await Admin.findById(req.adminId).select("-__v -password")
  res.json(admin)
  
})
router.post("/add-admin",checkAdmin,validateBody(signupJoi), async (req, res) => {
  try {
    const { firstName, lastName, email, password, avatar } = req.body 
    
    
    const adminFound = await Admin.findOne({ email }) 
    if (adminFound) return res.status(400).send("Admin already registered")
   
    const salt = await bcrypt.genSalt(10)
    const hash =await bcrypt.hash(password, salt)

    const admin = new Admin({
      firstName,
      lastName,
      email,
      password: hash, 
      avatar,
     
    })
    await admin.save() 
    delete admin._doc.password 
    res.json(admin)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

/////************************ Add patient*********************************************/////
router.get("/patient", checkAdmin, async (req, res) => {
  const patient = await Patient.find().select("-__v -password")
  res.json(patient)
})
//Add patient
router.post("/patient", checkAdmin, validateBody(patientAddJoi), async (req, res) => {
  try {
    const { firstName, lastName, avatar, phone, fileNumber,bloodType, age, weight, height, disease, email, password } = req.body

    const patientFound = await Patient.findOne({ fileNumber })
    if (patientFound) return res.status(400).send("Patient already registered")
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const patient = new Patient({
      firstName,
      lastName,
      email,
      password: hash,
      avatar,
      phone,
      fileNumber,
      bloodType,
      age,
      weight,
      height,
      disease,
    })
    await patient.save()
    delete patient._doc.password
    res.json(patient)
  } catch (error) {
    res.status(500).send(error.message)
  }
})
//put patient
router.put("/patient/:id", checkAdmin, checkId, validateBody(adminpatientEditJoi), async (req, res) => {
  try {
    const { firstName, lastName, avatar, phone, fileNumber, age, weight, height, disease, email, password } = req.body

    let hash
    if(password){
       const salt = await bcrypt.genSalt(10)
       hash = await bcrypt.hash(password, salt)
       }
    const patient = await Patient.findByIdAndUpdate(
      req.params.id,
      { $set: { firstName, lastName, avatar, phone, fileNumber, age, weight, height, disease, email, password:hash } },
      { new: true }
    )

    if (!patient) return res.status(404).send("Patient not found")
    res.json(patient)
  } catch (error) {
    res.status(500).send(error.message)
  }
})
////delete patient
router.delete("/patient/:id", checkAdmin, checkId, async (req, res) => {
  try {
    const patient = await Patient.findByIdAndRemove(req.params.id)
    if (!patient) return res.status(404).send("Patient is not Found")

    res.json("Patient is removed")
  } catch (error) {
    res.status(500).send(error.message)
  }
})

/////************************ Add Dietitians*****************************************/////

////get
router.get("/dietitien", checkAdmin, async (req, res) => {
  const dietitien = await Dietitian.find().select("-__v -password")
  res.json(dietitien)
})
//Add dietitien
router.post("/dietitien", checkAdmin, validateBody(dietitianAddJoi), async (req, res) => {
  try {
    const { firstName, lastName, avatar, phone, employeeId, email, password } = req.body

    const dietitienFound = await Dietitian.findOne({ employeeId })
    if (dietitienFound) return res.status(400).send("dietitien already registered")
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const dietitien = new Dietitian({
      firstName,
      lastName,
      email,
      password: hash,
      avatar,
      phone,
      employeeId,
    })
    await dietitien.save()
    delete dietitien._doc.password
    res.json(dietitien)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

//put Dietitians
router.put("/dietitien/:id", checkAdmin, checkId, validateBody(admindietitienEditJoi), async (req, res) => {
  try {
    const { firstName, lastName, avatar, phone, employeeId, email, password } = req.body
    let hash
    if(password){
       const salt = await bcrypt.genSalt(10)
       hash = await bcrypt.hash(password, salt)
       }
    const dietitien = await Dietitian.findByIdAndUpdate(
      req.params.id,
      { $set: { firstName, lastName, avatar, phone, employeeId, email, password:hash } },
      { new: true }
    )

    if (!dietitien) return res.status(404).send("Datient not found")
    res.json(dietitien)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

///Delete Dietitians
router.delete("/dietitien/:id", checkAdmin, checkId, async (req, res) => {
  try {
    const dietitien = await Dietitian.findByIdAndRemove(req.params.id)
    if (!dietitien) return res.status(404).send("Dietitien is not Found")

    res.json("Dietitien is removed")
  } catch (error) {
    res.status(500).send(error.message)
  }
})
/////************************ Add Ingredients*****************************************/////
/////get Ingredients
router.get("/ingredients",  async (req, res) => {
  const ingredient = await Ingredient.find().populate("types").select("-__v")
  res.json(ingredient)
})
//Add Ingredients
router.post("/ingredients", checkAdmin, validateBody(ingredientAddJoi), async (req, res) => {
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
router.put("/ingredients/:id", checkAdmin, checkId, validateBody(ingredientEditJoi), async (req, res) => {
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

router.delete("/ingredients/:id", checkAdmin, checkId, async (req, res) => {
  try {
    const ingredient = await Ingredient.findByIdAndRemove(req.params.id)
    if (!ingredient) return res.status(404).send("ingredient is not Found")

    res.json("ingredient is removed")
  } catch (error) {
    res.status(500).send(error.message)
  }
})

/////************************ Add Employee*********************************************/////
router.get("/employee", checkAdmin, async (req, res) => {
  const employee = await Employee.find().select("-__v -password")
  res.json(employee)
})
//Add Employee
router.post("/employee", checkAdmin, validateBody(employeeAddJoi), async (req, res) => {
  try {
    const { firstName, lastName, avatar, phone, employeeId, email, password, job } = req.body

    const employeeFound = await Employee.findOne({ employeeId })
    if (employeeFound) return res.status(400).send("Employee already registered")
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const employee = new Employee({
      firstName,
      lastName,
      email,
      password: hash,
      avatar,
      phone,
      employeeId,
      email,
      job,
    })
    await employee.save()
    delete employee._doc.password
    res.json(employee)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

//put Employee
router.put("/employee/:id", checkAdmin, checkId, validateBody(adminemployeeEditJoi), async (req, res) => {
  try {
 
   const {  firstName, lastName, avatar, phone, employeeId, email, password, job } = req.body
let hash
   if(password){
      const salt = await bcrypt.genSalt(10)
      hash = await bcrypt.hash(password, salt)
      }
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { $set: { firstName, lastName, avatar, phone, employeeId, email, password:hash, job } },
      { new: true }
    )

    if (!employee) return res.status(404).send("Employee not found")
    res.json(employee)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

///Delete Employee
router.delete("/employee/:id", checkAdmin, checkId, async (req, res) => {
  try {
    const employee = await Employee.findByIdAndRemove(req.params.id)
    if (!employee) return res.status(404).send("Employee is not Found")

    res.json("Employee is removed")
  } catch (error) {
    res.status(500).send(error.message)
  }
})



module.exports = router
