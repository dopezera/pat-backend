import Event from '../models/eventModel.js'

const createNewEvent = (description, status) => {
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

export default createNewEvent
