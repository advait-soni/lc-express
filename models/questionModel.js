import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    date: String, 
    questionIds: [String],
}, { collection: "questions"})

const Questions = mongoose.model(("QuestionLog", questionSchema))