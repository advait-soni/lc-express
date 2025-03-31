import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    date: String, 
    questionIds: [String],
})

const questions = mongoose.model('questions', questionSchema)


export default questions