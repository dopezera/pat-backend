import Event from '../models/eventModel.js'

export const createEvent = async (req, res) => {
    console.log(req.body);
    const event = await new Event({
        description: req.body.description,
        status: req.body.status
      })

    const createdEvent = await event.save()
    res.send({ createdEvent })
}

