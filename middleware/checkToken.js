const jwt = require("jsonwebtoken")
const { Admin } = require("../models/Admin")

const checkToken = async (req, res, next) => {
  try {
    const token = req.header("Authorization")
    if (!token) return res.status(401).send("token is missing")

    const decryptedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
    const adminId = decryptedToken.id

    const admin = await Admin.findById(adminId)
    if (!admin) return res.status(404).send("admin not found")

    req.adminId = adminId
    next()
  } catch (error) {
    console.log(error)
    res.status(500).send(error.message)
  }
}

module.exports = checkToken