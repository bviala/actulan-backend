require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Successfully connected to the DB')
  })
  .catch(console.error.bind(console, 'DB connection error:'))

const app = express()

app.get('/', (req, res) => res.send('Hello World !'))

app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`))
