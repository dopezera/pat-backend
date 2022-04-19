import express from 'express'
import {getAllMatches} from './controllers/MatchControllers.js'
import {getAllUsers} from './controllers/UserControllers.js'
import {getAuthUser, isAuth, verifyAuth} from './controllers/AuthControllers.js'
import passport from 'passport'
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getEvent,
  getEventCheckins,
  updateEvent,
} from './controllers/EventControllers.js'

const router = express.Router()

//USERS ROUTES
router.get('/api/users', verifyAuth, getAllUsers)
//USER AUTHENTICATION ROUTES
router.get('/api/users/isauth', isAuth)
router.get(
  '/api/users/auth/steam',
  passport.authenticate('steam', {session: false})
)
router.get(
  '/api/users/auth/steam/return',
  passport.authenticate('steam', {session: false}),
  getAuthUser
)
//MATCH ROUTES
router.get('/api/matches', verifyAuth, getAllMatches)
//EVENT ROUTES
router.get('/api/events', verifyAuth, getAllEvents)
router.post('/api/events/create', verifyAuth, createEvent)
router.get('/api/events/:id', verifyAuth, getEvent)
router.post('/api/events/update/:id', verifyAuth, updateEvent)
router.get('/api/events/delete/:id', verifyAuth, deleteEvent)
router.get('/api/events/checkins/:id', verifyAuth, getEventCheckins)
//PSTATS SIMULATOR ROUTE
import pstatsLoader from './fakedb/pstatsLoader.js'
router.use('/api/pstats', pstatsLoader)
export default router
