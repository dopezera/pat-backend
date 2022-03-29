import Event from '../models/eventModel.js'
import expressAsyncHandler from 'express-async-handler'

export const createEvent = async (req, res) => {
    console.log(req.body);
    if (!req.body.description) {
      return res.status(400).send('Event description must be specified')
    }

    if (!req.body.status) {
      return res.status(400).send('Event status must be specified')
    }

    const event = await new Event({
        description: req.body.description,
        status: req.body.status
      })

    const createdEvent = await event.save()
    return res.send({ createdEvent })
}


export const getEvents = 
    expressAsyncHandler(async (req, res) => {
        const events = await Event.findAll()
        return res.send(events)
      })
