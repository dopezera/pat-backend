import {
  checkUserIn,
  createNewEvent,
  deleteCheckinInDb,
  deleteEventInDb,
  findCheckinInDb,
  findEventInDb,
  getCheckins,
  getEventsInDb,
  isUserCheckedIn,
  updateEventInDb,
} from '../repository/EventRepo.js'

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
  getEventsInDb()
    .then(events => {
      return res.send(events)
    })
    .catch(err => {
      return res.status(500).end()
    })
}

export const getEvent = (req, res) => {
  findEventInDb(req.params.id)
    .then(event => {
      if (!event) {
        return res.status(404).end()
      }
      return res.send(event)
    })
    .catch(err => {
      return res.status(500).end()
    })
}

export const updateEvent = (req, res) => {
  findEventInDb(req.params.id).then(event => {
    if (!event) {
      return res.status(404).end()
    }
    updateEventInDb(event, req.body).then(updatedEvent => {
      return res.send(updatedEvent)
    })
  })
}

export const deleteEvent = (req, res) => {
  findEventInDb(req.params.id)
    .then(event => {
      if (!event) {
        return res.status(404).end()
      }
      deleteEventInDb(event).then(deletedEvent => {
        return res.send(deletedEvent)
      })
    })
    .catch(err => {
      res.status(500).end()
    })
}

export const getEventCheckins = (req, res) => {
  findEventInDb(req.params.id)
    .then(event => {
      if (!event) {
        return res.status(404).end()
      }
      getCheckins(event.id).then(checkins => {
        return res.send(checkins)
      })
    })
    .catch(err => {
      return res.status(500).send(err.message)
    })
}

export const eventCheckIn = (req, res) => {
  findEventInDb(req.params.id)
    .then(event => {
      if (!event) {
        return res.status(404).end()
      }
      isUserCheckedIn(event.dataValues.id, req.decoded.user.steamid).then(
        userCheckedIn => {
          if (userCheckedIn) {
            return res
              .status(200)
              .send('Checkin já foi realizado anteriormente')
          }
          checkUserIn(event, req.decoded.user).then(checkedInUser => {
            return res.send(checkedInUser)
          })
        }
      )
    })
    .catch(err => {
      res.status(500).send('erro')
    })
}

export const deleteCheckIn = (req, res) => {
  findCheckinInDb(req.params.id)
    .then(checkin => {
      if (!checkin) {
        return res.status(404).end()
      }
      isUserCheckedIn(
        checkin.dataValues.eventId,
        req.decoded.user.steamid
      ).then(userCheckedIn => {
        if (userCheckedIn) {
          deleteCheckinInDb(checkin).then(deletedCheckin => {
            return res.send(deletedCheckin)
          })
        } else {
          return res.status(405).end()
        }
      })
    })
    .catch(err => {
      return res.status(500).send('erro')
    })
}
