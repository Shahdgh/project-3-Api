const express = require("express")
const checkAdmin = require("../middleware/checkAdmin")
const router = express.Router()
const { Type, typeAddJoi, typeEditJoi } = require("../models/Type")
const validateBody = require("../middleware/validateBody")
const checkId = require("../middleware/checkId")

router.get("/", async (req, res) => {
  const type = await Type.find().select("-__v")
  res.json(type)
})

router.post("/", checkAdmin, validateBody(typeAddJoi), async (req, res) => {
  try {
    const { name, image } = req.body

    const type = new Type({
      name,
      image,
    })
    await type.save()
    res.json(type)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.put("/:id", checkAdmin, checkId, validateBody(typeEditJoi), async (req, res) => {
  try {
    const { name, image } = req.body

    const type = await Type.findByIdAndUpdate(req.params.id, { $set: { name, image } }, { new: true })

    if (!type) return res.status(404).send("type not found")
    res.json(type)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.delete("/:id", checkAdmin, checkId, async (req, res) => {
  try {
    const type = await Type.findByIdAndRemove(req.params.id)
    if (!type) return res.status(404).send("type is not Found")

    res.json("type is removed")
  } catch (error) {
    res.status(500).send(error.message)
  }
})

module.exports = router
