import Checkin from './models/checkinModel.js'
import User from './models/userModel.js'
import bcrypt from 'bcryptjs'
import bodyParser from 'body-parser'
import config from './config.js'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import path from 'path'
import routes from './routes.js'
import sequelize from './db.js'
import {Strategy} from 'passport-steam'
import {generateToken} from './utils.js'

dotenv.config()
const app = express()

//app.use(cors({ origin: 'https://mixstats.herokuapp.com', credentials: true}));
app.use(cors())
app.use(express.json()) //allow json in the body of requests (signin backend in basir's video)
app.use(express.urlencoded({extended: true})) //with this 2 middleware all requests that contain data will translate to req.body
app.use(bodyParser.json())

app.get(
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

app.get(
  '/api/users',
  expressAsyncHandler(async (req, res) => {
    const users = await User.findAll({
      attributes: ['id', 'username', 'kdr', 'winPercentage', 'impact'],
    })
    res.send(users)
  }),
)

app.get(
  '/api/users/checkedin',
  expressAsyncHandler(async (req, res) => {
    const users = await Checkin.findAll({
      attributes: ['eventId', 'userId', 'username', 'userlvl', 'createdAt'],
    })
    res.send(users)
  }),
)

app.post(
  '/api/user/checkin',
  expressAsyncHandler(async (req, res) => {
    const checkin = new Checkin({
      eventId: 1,
      userId: req.body.userId,
      username: req.body.username,
      userlvl: req.body.userlvl,
    })

    const createdCheckin = await checkin.save()

    res.send({
      id: createdCheckin.id,
      eventid: createdCheckin.eventid,
      userid: createdCheckin.userid,
      username: createdCheckin.username,
      userlvl: createdCheckin.userlvl,
    })
  }),
)

app.post(
  '/api/user/signin',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({where: {steamid: req.body.steamid}})
    console.log('pqp eiom')
    if (user) {
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

app.post(
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

/** BAGUI DA STEAM */

app.set('view engine', 'ejs')
app.set('views', '/views')

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

app.use(passport.initialize())

//app.get("/api/auth/steam", passport.authenticate("steam", { session: false }), res.send('testing'));

app.get('/api/auth/steam', passport.authenticate('steam', {session: false}))

app.get(
  '/api/auth/steam/return',
  passport.authenticate('steam', {session: false}),
  (req, res) => {
    const token = jwt.sign({user: req.user}, config.SECRET_KEY, {
      expiresIn: '2h',
    })

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

app.set('view engine', 'ejs')
app.set('views', './views')

app.use(routes)

app.listen(config.PORT, () => {
  console.log(`Serve at http://localhost:${config.PORT}`)
})
