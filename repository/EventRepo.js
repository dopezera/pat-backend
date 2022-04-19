import Event from '../database/models/eventModel.js'
import Checkin from '../database/models/checkinModel.js'

export const createNewEvent = (description, status) => {
  const createdEvent = Event.create({
    description: description,
    status: status,
  })
    .then(event => {
      return event.save()
    })
    .catch(err => {
      return err
    })
  return createdEvent
}

export const getEventsInDb = () => {
  const allEvents = Event.findAll().then(events => {
    return events
  })
  return allEvents
}

export const findEventInDb = id => {
  const myEvent = Event.findOne({
    where: {
      id: id,
    },
  }).then(event => {
    if (!event) {
      return
    }
    return event
  })
  return myEvent
}

export const updateEventInDb = (event, newData) => {
  const updatedEvent = event
    .update({
      description: newData.description,
      status: newData.status,
    })
    .then(event => {
      return event
    })
  return updatedEvent
}

export const deleteEventInDb = event => {
  const deletedEvent = event.destroy().then(event => {
    return event
  })
  return deletedEvent
}

export const getCheckins = id => {
  const myCheckins = Checkin.findAll({
    where: {
      eventId: id,
    },
  }).then(checkins => {
    return checkins
  })
  return myCheckins
}
