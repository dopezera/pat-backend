import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import Event from '../models/eventModel.js'

const eventRouter = express.Router();

eventRouter.post('/create',
expressAsyncHandler(async (req, res) => {
    console.log(req.body);
    const event = new Event({
        description: req.body.description,
        status: req.body.status
      })

    const createdEvent = await event.save()
    res.send({ createdEvent })
  })
)

export default eventRouter;