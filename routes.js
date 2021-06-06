import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import passport from 'passport'
import sequelize from './db.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import Checkin from './models/checkinModel.js'
import {generateToken} from './utils.js'
import User from './models/userModel.js'
import config from './config.js'

import {Strategy} from 'passport-steam'

const router = express.Router()

passport.use(
  new Strategy(config.passportOptions, async (identifier, profile, done) => {
    profile.identifier = identifier
    let user = await User.findOne({steamId: profile.id})

    if (!user) {
      user = await new User({
        steamid: profile._json.steamid,
        username: profile._json.personaname,
      }).save()
    }

    return done(null, user)
  }),
)

router.get('/', (req, res) => {
  res.send('ok')
})

router.get(
  '/api/matches',
  expressAsyncHandler(async (req, res) => {
    const [results, metadata] = await sequelize.query(
      'SELECT * FROM matches INNER JOIN pstats ON matches.id = pstats.matchId',
    )
    //for each result, get result.matchId then go to match and verify winner then compare winner with pstats.team and set winner

    let obj = {
      match_id: 0,
    }

    const matches = []

    const hash = results.reduce(
      (p, c) => (p[c.matchId] ? p[c.matchId].push(c) : (p[c.matchId] = [c]), p),
      {},
    )
    const newData = Object.keys(hash).map(k => ({matchId: k, pstats: hash[k]}))
    newData.map(details => {
      obj = {
        id: details.matchId,
        created: details.pstats[0].createdAt,
        map_name: details.pstats[0].map,
        ct_score: details.pstats[0].ct_score,
        t_score: details.pstats[0].t_score,
        winner: details.pstats[0].m_winner,
        players_details: details.pstats,
      }
      matches.push(obj)
    })
    res.send(matches)
  }),
)

router.get(
  '/api/users',
  expressAsyncHandler(async (req, res) => {
    const users = await User.findAll({
      attributes: ['id', 'username', 'kdr', 'winPercentage', 'impact'],
    })
    res.send(users)
  }),
)

router.get(
  '/api/users/checkedin',
  expressAsyncHandler(async (req, res) => {
    const users = await Checkin.findAll({
      attributes: ['eventId', 'userId', 'username', 'userlvl', 'createdAt'],
    })
    res.send(users)
  }),
)

router.post(
  '/api/user/checkin',
  expressAsyncHandler(async (req, res) => {
    const checkin = new Checkin({
      eventId: 1,
      userId: req.body.userId,
      username: req.body.username,
      userlvl: req.body.userlvl,
    })

    const createdCheckin = await checkin.save()

    console.log(`User ${user.username} checked in`)
    res.send({
      id: createdCheckin.id,
      eventid: createdCheckin.eventid,
      userid: createdCheckin.userid,
      username: createdCheckin.username,
      userlvl: createdCheckin.userlvl,
    })
  }),
)

router.post(
  '/api/user/signin',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({where: {steamid: req.body.steamid}})
    if (user) {
      console.log(`User ${user.username} logged in`)
      res.send({
        id: user.id,
        username: user.username,
        lvl: user.impact,
        token: generateToken(user),
      })
      return
    }
    res.status(401).send({message: 'Invalid email or password'})
  }),
)

router.post(
  '/api/user/create',
  expressAsyncHandler(async (req, res) => {
    const user = new User({
      username: req.body.username,
      steamid: req.body.steamid,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    })
    const userInDb = await User.findOne({where: {steamid: user.steamid}}) //verifico se esse usuario ja jogou no server

    if (userInDb != null) {
      //se ja jogou
      if (userInDb.email != null) {
        //verifico se o usuario ja tem e-mail associado
        throw new error({
          message: 'Atenção: Você já fez cadastro antes. Faça login.',
        })
        //res.send({ error: 'esse bicho ja ta cadastrado'}); //se sim, eu sei que ele já se cadastrou além de jogar
      } else {
        //se ele ja jogou mas ainda nao tem cadastro, eu dou update no usuario dele completando o cadastro
        const updatedUser = await User.update(
          {
            username: user.username,
            email: user.email,
            password: user.password,
          },
          {
            where: {
              steamid: user.steamid,
            },
          },
        )

        console.log(`User ${user.username} completed registration`)
        res.send({
          id: updatedUser.id,
          username: updatedUser.username,
          token: generateToken(updatedUser),
        })
      }
    } else {
      const createdUser = await user.save()
      res.send({
        id: createdUser.id,
        username: createdUser.username,
        token: generateToken(createdUser),
      })
    }
  }),
)

router.get('/api/auth/steam', passport.authenticate('steam', {session: false}))

router.get(
  '/api/auth/steam/return',
  passport.authenticate('steam', {session: false}),
  (req, res) => {
    const token = jwt.sign({user: req.user}, config.SECRET_KEY, {
      expiresIn: '2h',
    })

    console.log(`User ${req.user.username} authenticated with steam`)
    console.log(`Steam ID : ${req.user.steamid}`)
    res.render('authenticated', {
      //chamo render que por sua vez vai chamar o front
      userid: req.user.id,
      username: req.user.username,
      lvl: req.user.impact,
      steamid: req.user.steamid,
      jwtToken: token,
      clientUrl: config.FRONTEND_URL,
    })
  },
)

export default router
