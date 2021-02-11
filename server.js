// Imports
if(process.env.NODE_ENV !== 'production'){
	require('dotenv').config()
}
const express = require('express')
const mongoose = require('mongoose')

// Create an instance of express app
const app = express()
// Set port
const port = process.env.PORT || '3000'

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('[STATUS] Connected to Database'))

// Configure express to use json
app.use(express.json())

// Import and use user routes
const usersRouter = require('./routes/users')
app.use('/users', usersRouter)

// Listen app on given port
app.listen(port, () => {
	console.info(`[STATUS] App listening on port ${port}`)
})