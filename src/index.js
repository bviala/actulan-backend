require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch(console.error.bind(console, 'DB connection error:'))

// routes
app.use('/api/events', require('./routes/events.js'))

app.listen(process.env.PORT, () => console.log(`Actulan backend listening on port ${process.env.PORT}`))
