import userRouter from './routers/userRouter.js';
import matchRouter from './routers/matchRouter.js';
import eventRouter from './routers/eventRouter.js';

import pstatsLoader from './fakedb/pstatsLoader.js';

import express from 'express'

const router = express.Router()

router.use('/api/users', userRouter);
router.use('/api/matches', matchRouter);
router.use('/api/events', eventRouter);

router.use('/api/pstats', pstatsLoader);

router.get('/', (req, res) => {
  res.send('ok')
})



export default router
