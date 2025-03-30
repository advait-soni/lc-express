import express from "express"

const app = express()
const PORT = 8000

app.use(express.json())

app.post('/api/questions', (req, res) => {
    console.log("req", req.body)
    
    res.end()
})

app.get('/api/questions/:date', (req, res) => {
    
})


app.listen(PORT , () => {
    console.log(`Server running on port ${PORT}`)
})