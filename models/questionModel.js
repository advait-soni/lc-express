import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    date:{
        type: String, 
        required: true, 
        unique: true, 
    }, 
    ids: {
        type: [String], 
        default: [], 
    }
})

const questions = mongoose.model('questions', questionSchema)

    
export default questions