const mongoose = require('mongoose')
const shortid = require('shortid')

const eventSchema = mongoose.Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  name: String,
  startDate: Date,
  endDate: Date,
  slotNumber: Number,
  slotPrice: Number,
  website: String,
  location: {
    address: String,
    zipCode: String,
    city: String,
    latitude: Number,
    longitude: Number
  }
})

module.exports = mongoose.model('Event', eventSchema)
