const express = require("express")

const { createOne, getAll, getOneById } = require("./controller")

const router = express.Router()

router.post("/", createOne)

router.get("/", getAll)

router.get("/", getOneById)

module.exports = router