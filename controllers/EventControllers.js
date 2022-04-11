import Event from '../models/eventModel.js'
import createNewEvent from '../repository/EventRepo.js'

export const createEvent = async (req, res) => {
  if (!req.body.description) {
    return res.status(400).send('Event description must be specified')
  }

  if (!req.body.status) {
    return res.status(400).send('Event status must be specified')
  }

  createNewEvent(req.body.description, req.body.status)
    .then(createdEvent => {
      res.send(createdEvent.dataValues)
    })
    .catch(err => res.status(500).send(err))
}

export const getAllEvents = (req, res) => {
  Event.findAll()
    .then(events => {
      return res.send(events)
    })
    .catch(err => {
      return res.status(500).end()
    })
}

export const getEvent = (req, res) => {
  Event.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then(event => {
      if (!event) {
        return res.send('Evento não encontrado')
      }
      return res.send(event)
    })
    .catch(err => {
      return res.status(500).end()
    }) //devo exibir o erro?
}

export const updateEvent = (req, res) => {
  Event.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then(event => {
      if (event) {
        return event
          .update({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
          })
          .then(event => {
            return res.send(event)
          })
      }
      return res.send('Evento não encontrado')
    })
    .catch(err => {
      return res.status(500).end()
    })
}

export const deleteEvent = (req, res) => {
  Event.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then(event => {
      if (!event) {
        return res.status(404).send('Evento não encontrado')
      }
      return event.destroy().then(event => {
        return res.send(event)
      })
    })
    .catch(err => {
      res.status(500).end()
    })
}
