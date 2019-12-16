require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Event = require('./models/event')

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch(console.error.bind(console, 'DB connection error:'))

// Parses requests body from JSON
app.use(express.json())

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

// Event creation
app.post('/api/events', async (req, res, next) => {
  const newEvent = new Event({
    ...req.body
  })
  newEvent.save()
    .then(() => res.sendStatus(200))
    .catch(err => {
      if (err.name === mongoose.Error.ValidationError.name) {
        res.status(400).send(err.message)
      } else {
        next(err)
      }
    })
})

// Event update
app.put('/api/events/:id', async (req, res, next) => {
  Event.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.sendStatus(200))
    .catch(err => {
      if (err.name === mongoose.Error.ValidationError.name) {
        res.status(400).send(err.message)
      } else {
        next(err)
      }
    })
})

// Event deletion
app.delete('/api/events/:id', async (req, res, next) => {
  Event.findByIdAndDelete(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(next)
})

app.listen(process.env.PORT, () => console.log(`Actulan backend listening on port ${process.env.PORT}`))
