import express from 'express'
import {getMatches} from './controllers/MatchControllers.js';
import getUsers from './controllers/UserControllers.js';
import {getAuthUser, isAuth, verifyAuth} from './controllers/AuthControllers.js'
import passport from 'passport'
import { createEvent, getEvents } from './controllers/EventControllers.js';

const router = express.Router()

//USERS ROUTES
router.get('/api/users', verifyAuth, getUsers);
//USER AUTHENTICATION ROUTES
router.get('/api/users/isauth', isAuth);
router.get('/api/users/auth/steam', passport.authenticate('steam', {session: false}));
router.get('/api/users/auth/steam/return', passport.authenticate('steam', {session: false}), getAuthUser)
//MATCH ROUTES
router.get('/api/matches', verifyAuth, getMatches)
//EVENT ROUTES
router.get('/api/events', verifyAuth, getEvents)
router.post('/api/events/create', createEvent)
//PSATS SIMULATOR ROUTE
import pstatsLoader from './fakedb/pstatsLoader.js';
router.use('/api/pstats', pstatsLoader);
export default router
