import userRouter from './routers/userRouter.js';
import eventRouter from './routers/eventRouter.js';
import express from 'express'
import sequelize from './db.js'
import pstatsLoader from './fakedb/pstatsLoader.js';

import getMatches from './controllers/matches.js';

const router = express.Router()

router.get('/api/matches', (req, res) => {
  getMatches(req, res)
})

/*

router.use('/api/users', userRouter);
router.use('/api/events', eventRouter);

router.use('/api/pstats', pstatsLoader);

router.get('/', (req, res) => {
  res.send('ok')
})

*/

export default router
