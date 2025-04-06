import express from "express"
import "dotenv/config"
import mongoose from "mongoose"
import questions from "./models/questionModel.js"

const MONGO_URI = process.env.MONGO_URI
const app = express()
const PORT = process.env.PORT || 8000

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("mongoDb")
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((err) => {
    console.error(err)
  })

app.use(express.json())


app.post("/api/questions", async (req, res) => {
  try{
    let Q = new questions({
      date: req.body.date, 
      id: req.body.id
    })
    await Q.save()
    res.status(201).json({message: "Question saved successful"})
  } catch(error) {
    console.error(error)
    res.status(500).send({message: 'Something went wrong'})
  }
})


app.get("/api/questions/:date", (req, res) => {})
