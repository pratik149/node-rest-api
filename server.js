require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('[STATUS] Connected to Database'))

app.use(express.json())

const usersRouter = require('./routes/users')
app.use('/users', usersRouter)

app.listen(process.env.PORT || 3000, () => console.log('[STATUS] Server started'))