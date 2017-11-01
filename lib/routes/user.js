"use strict"

const express = require("express")

const router = new express.Router()

router.get("/", (req, res, next) => {
  res.render("index", { title: "User", page: "User" })
})

module.exports = router
