const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()
const Joi = require("joi")
const JoiObjectId = require("joi-objectid")
Joi.objectid = JoiObjectId(Joi)
const admins = require("./routes/admins")
const types = require("./routes/types")
const dietitians = require("./routes/dietitians")
const companions = require("./routes/companions")
const patients= require("./routes/patients")
const employees = require("./routes/employees")
const meals = require("./routes/meals")
mongoose
  .connect(`mongodb+srv://shahadgh:${process.env.MONOGDB_PASSWORD}@cluster0.nbouy.mongodb.net/restaurantDB`)
  // .connect(`mongodb://localhost:27017/restaurantDB`)
  .then(() => {
    console.log("connected to MongoDB")
  })
  .catch(error => {
    console.log("Error conneceting to MongoDB", error)
  })

  
const app = express()
app.use(express.json())
app.use(cors())

app.use("/api/admin", admins)
app.use("/api/types", types )
app.use("/api/dietitians", dietitians)
app.use("/api/companions", companions)
app.use("/api/patients",patients)
app.use("/api/employees",employees)
app.use("/api/meals",meals)











const port = process.env.PORT || 5000

app.listen(port, () => console.log("server is listening on port " + port))