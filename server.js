import express from "express"

const app = express()
const PORT = 8000

app.post('/api/questions', (req, res) => {
    
})

app.get('/api/questions/:date', (req, res) => {
    
})


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})