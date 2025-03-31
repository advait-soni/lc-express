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
    console.log("req", req.body)
    const Q = new questions({
    date: '31-03-2025',
    questionIds: ['1234']
    })
    await Q.save()
    res.status(201).json({message: "Question saved in DB"})
    res.end()
  } catch(error){
    console.error(error)
    res.status(500).json({message: "failed to save ques"})
  }
})

app.get("/api/questions/:date", (req, res) => {})
