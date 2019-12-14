require('dotenv').config()
const mongoose = require('mongoose')
const Event = require('./src/models/event')

const myEvents = [
  new Event({
    name: 'MEXILAN party',
    startDate: new Date('2019-10-05T18:00:00.000Z'),
    endDate: new Date('2019-10-06T03:00:00.000Z'),
    slotNumber: 24,
    slotPrice: 8,
    website: 'mosellanproject.fr',
    location: {
      address: 'MJC Metz-Sud',
      zipCode: '57000',
      city: 'Metz',
      latitude: 49.113014,
      longitude: 6.185324
    }
  }),
  new Event({
    name: 'LANOWEEN ARENA 2019',
    startDate: new Date('2019-10-19T10:00:00.000Z'),
    endDate: new Date('2019-10-20T17:00:00.000Z'),
    slotNumber: 100,
    slotPrice: 10,
    website: 'comeandplay.fr',
    location: {
      zipCode: '70400',
      city: 'Héricourt',
      latitude: 47.576238,
      longitude: 6.760619
    }
  }),
  new Event({
    name: 'Game Arena #03',
    startDate: new Date('2019-10-11T20:00:00.000Z'),
    endDate: new Date('2019-10-13T19:00:00.000Z'),
    slotNumber: 350,
    slotPrice: 40,
    website: 'valenciennes-game-arena.com',
    location: {
      address: '1, Esplanade des Rives Créatives de l’Escaut',
      zipCode: '59410',
      city: 'Anzin',
      latitude: 50.373458,
      longitude: 3.507967
    }
  })
]

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    await Event.deleteMany()
    await Promise.all(myEvents.map(event => event.save()))
    process.exit(0)
  })
