const log4js = require("log4js")
const mongoose = require("mongoose")

const logger = log4js.getLogger()

const connectDB = () => {
  const mongoUri = process.env.MONGODB_URI || process.env.MONGOLAB_URI

  mongoose.connect(mongoUri, {
    useMongoClient: true
  })

  mongoose.connection.on("error", () => {
    logger.error(
      "MongoDB connection error. Please make sure MongoDB is running."
    )
    process.exit()
  })
  mongoose.connection.once("open", () => {
    logger.info("Connect mongodb server")
  })
}

module.exports = {
  connectDB
}
