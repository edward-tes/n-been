"use strict"

const express = require("express")

const router = new express.Router()

router.get("/", (req, res, next) => {
  res.render("index", { title: "Home", page: "Home" })
})

module.exports = router
