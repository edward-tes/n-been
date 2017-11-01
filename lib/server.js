const express = require("express")
const path = require("path")
const fs = require("fs")
const rfs = require("rotating-file-stream")
const { connectDB } = require("./db")
const userRoute = require("./routes/user")
const homeRoute = require("./routes/home")
const morgan = require("morgan")

class Server {
  static bootstrap() {
    return new Server()
  }

  constructor() {
    this.app = express()
    connectDB()

    this.prepare()
    this.config()
    this.routes()
  }

  config() {
    this.app.use(
      morgan("dev", {
        skip(req, res) {
          return res.statusCode < 400
        }
      })
    )

    this.app.use("/public", express.static(path.join(__dirname, "public")))

    this.app.use(this.configLogger())

    this.app.set("views", "./views")
    this.app.set("view engine", "pug")
  }

  routes() {
    this.app.use("/", homeRoute)
    this.app.use("/user", userRoute)
  }

  prepare() {
    this.logDirectory = path.join(__dirname, "logs")

    if (!fs.existsSync(this.logDirectory)) {
      fs.mkdirSync(this.logDirectory)
    }
  }

  configLogger() {
    const accessLogStream = rfs("access.log", {
      interval: "1d",
      path: this.logDirectory
    })

    return morgan("common", { stream: accessLogStream })
  }
}

module.exports = Server
