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
    const {date, id} = req.body
    await questions.findOneAndUpdate(
      {date: date}, 
      {$addToSet: { ids: id }}, 
      {upsert: true}
    )
    res.status(201).json({message: "Question saved successful"})
  } catch(error) {
    console.error(error)
    res.status(500).send({message: 'Something went wrong'})
  }
})


app.get("/api/questions/:date", async (req, res) => {
  const date = req.params.date
  const arr = await questions.findOne({date})
  
  if(arr){
    res.json({num: arr.ids.length})
  }
  else{
    res.status(500).json({message: 'Something Went Wrong'})
  }
})
