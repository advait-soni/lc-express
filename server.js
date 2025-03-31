import express from "express"
import "dotenv/config"
import mongoose from "mongoose"

const MONGO_URI = process.env.MONGO_URI
const app = express()
const PORT = process.env.PORT || 8000

mongoose.connect(MONGO_URI).then(() => {
    console.log("mongoDb")
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}).catch((err) => {
    console.error(err)
})

app.use(express.json())

app.post("/api/questions", (req, res) => {
  console.log("req", req.body)

  res.end()
})

app.get("/api/questions/:date", (req, res) => {})
