import Event from '../database/models/eventModel.js'

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
