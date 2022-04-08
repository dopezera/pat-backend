import Event from '../models/eventModel.js'

export const createEvent = 
  (req, res) => {

  if (!req.body.description) {
      return res.status(400).send('Event description must be specified')
    }

  if (!req.body.status) {
    return res.status(400).send('Event status must be specified')
  }

  Event.create({
      description: req.body.description,
      status: req.body.status
    })
    .then(event => {
      return event.save()
    }).then(createdEvent => {
      return res.send(createdEvent)
    })
    .catch(err => {
      return res.status(500).end()
    })
}

export const getAllEvents = 
  (req, res) => {
    Event.findAll()
    .then(events => {
      return res.send(events)
    })
    .catch(err => {
      return res.status(500).end()
    })
  }


export const getEvent =
(req, res) => {
  Event.findOne({
    where: {
      id: req.params.id,
    },
  })
  .then(event => {
    if(!event) {
      return res.send('Evento não encontrado')
    }
    return res.send(event)
  })
  .catch(err => {
    return res.status(500).end()
  }) //devo exibir o erro?
}

export const updateEvent = 
  (req, res) => {
    Event.findOne({
      where: {
        id: req.params.id,
      },
    })
    .then(event => {
      if(event) {
        return event.update({
          title: req.body.title,
          description: req.body.description,
          status: req.body.status
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

export const deleteEvent = 
  (req, res) => {
    Event.findOne({
      where: {
        id: req.params.id,
      },
    })
    .then(event => {
      if (event) {
        return event.destroy()
      }
      return res.send('Evento não encontrado')
    })
    .then(event => {
      return res.send(event) //pq quando a promise anterior me retorna res.send('evento nao encontrado') ainda funciona dentro de um res.send?
    })
    .catch(err => {
      return res.status(500).end()
    })
}