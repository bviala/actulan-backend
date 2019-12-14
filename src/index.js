require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Event = require('./models/event')

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch(console.error.bind(console, 'DB connection error:'))

app.get('/api/events', async (req, res, next) => {
  Event.find()
    .then(events => res.send(events))
    .catch(next)
})

app.get('/api/events/:id', async (req, res, next) => {
  Event.findById(req.params.id)
    .then(event => {
      if (event) res.send(event)
      else res.sendStatus(404)
    })
    .catch(next)
})

app.listen(process.env.PORT, () => console.log(`Actulan backend listening on port ${process.env.PORT}`))
