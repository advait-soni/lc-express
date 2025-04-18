import express from "express"
import "dotenv/config"
import mongoose from "mongoose"
import questions from "./models/questionModel.js"
import cors from "cors"


const MONGO_URI = process.env.MONGO_URI
const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json())
app.use(cors())

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



app.post("/api/questions", async (req, res) => {
  try {
    const { date, id } = req.body
    console.log(date, id)
    await questions.findOneAndUpdate(
      { date: date },
      { $addToSet: { ids: id } },
      { upsert: true }
    )
    res.status(201).json({ message: "Question saved successful" })
  } catch (error) {
    console.error(error)
    res.status(500).send({ message: "Something went wrong" })
  }
})


app.get("/api/questions/all",  async (req, res) => {
  console.log('request')

  try{
    const result = await questions.aggregate([
      {
        $group: {
          _id: null,
          totalIds: { $sum: { $size: "$ids" } }
        }
      }
    ])
    console.log('result', result)
    // result [ { _id: null, totalIds: 6 } ]
    res.status(201).json({count: result[0].totalIds})
  } catch(error) {
    console.error(error)
    res.status(500).json({message: "Something went wrong"})
  }
})


app.get("/api/questions/:date", async (req, res) => {
  try {
    const date = req.params.date
    const arr = await questions.findOne({ date })
    console.log('date', date)
    if (arr) {
      res.json({ num: arr.ids.length })
    } else {
      res.status(500).json({ message: "Something Went Wrong" })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Something Went Wrong" })
  }
})



