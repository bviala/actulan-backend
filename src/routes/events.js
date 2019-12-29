const express = require('express')

const router = express.Router()
const Event = require('../models/event')
const mongoose = require('mongoose')

// Parses requests body from JSON
router.use(express.json())

  .get('/', async (req, res, next) => {
    Event.find()
      .then(events => res.send(events))
      .catch(next)
  })

  .get('/:id', async (req, res, next) => {
    Event.findById(req.params.id)
      .then(event => {
        if (event) res.send(event)
        else res.sendStatus(404)
      })
      .catch(next)
  })

  // Event creation
  .post('/', async (req, res, next) => {
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
  .put('/:id', async (req, res, next) => {
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
  .delete('/:id', async (req, res, next) => {
    Event.findByIdAndDelete(req.params.id)
      .then(() => res.sendStatus(200))
      .catch(next)
  })

module.exports = router
