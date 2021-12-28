const jwt = require("jsonwebtoken")
const { Admin } = require("../models/Admin")

const checkAdmin = async (req, res, next) => {
  try {
    const token = req.header("Authorization")
    if (!token) return res.status(401).send("token is missing")

    const decryptedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
    const adminId = decryptedToken.id

    const adminFound = await Admin.findById(adminId)

    if (!adminFound) return res.status(404).send("you are not admin")
    // if (adminFound.role !== "Admin") return res.status(403).send("you are not admin")
    req.adminId = adminId
    next()
  } catch (error) {
    console.log(error)
    res.status(500).send(error.message)
  }
}
module.exports = checkAdmin
