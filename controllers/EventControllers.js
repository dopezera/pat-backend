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


export const getAllEvents = 
    expressAsyncHandler(async (req, res) => {
        const events = await Event.findAll()
        return res.send(events)
      })


export const getEvent = 
  expressAsyncHandler(async (req, res) => {
    const event = await Event.findOne({
      where: {
        id: req.params.id,
      },
    })
    return res.send(event)
})

export const updateEvent = 
  expressAsyncHandler(async (req, res) => {
    const event = await Event.findOne({
      where: {
        id: req.params.id,
      },
    })
    if(event) {
        await event.update({
          title: req.body.title,
          description: req.body.description,
          status: req.body.status
        })
        return res.send(event)
      }
    return res.status(400).send({message: 'Evento não encontrado'})
    //tratar situações onde a descrição é grande demais, status inexistente etc
})

export const deleteEvent = 
  expressAsyncHandler(async (req, res) => {
    const event = await Event.findOne({
      where: {
        id: req.params.id,
      },
    })
    if (event) {
      const destroyedEvent = await event.destroy()
      return res.send(destroyedEvent)
    }
    return res.status(400).send({message: 'Evento não encontrado'})
})