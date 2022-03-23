import User from '../models/userModel.js'
import {Strategy} from 'passport-steam'
import expressAsyncHandler from 'express-async-handler'
import passport from 'passport'
import express from 'express'
import config from '../config.js'
import Checkin from '../models/checkinModel.js'
//import {generateToken} from '../utils.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'


const userRouter = express.Router();

// USER AUTHENTICATION //
passport.use(
  new Strategy(config.passportOptions, async (identifier, profile, done) => {
    profile.identifier = identifier

    let user = await User.findOne({
      where: {
        steamid: profile.id,
      },
    })

    if (!user) {
      console.log(`User not found in database, creating a new one`)
      user = await new User({
        steamid: profile._json.steamid,
        username: profile._json.personaname,
      }).save()
    }

    return done(null, user)
  }),
)

userRouter.get('/auth/steam', passport.authenticate('steam', {session: false}))

//no lugar de (req, res) usar funcao steamCallBack que tá em outro canto
userRouter.get(
  '/auth/steam/return',
  passport.authenticate('steam', {session: false}),
  (req, res) => {
    const token = jwt.sign({user: req.user}, config.SECRET_KEY, {
      expiresIn: '2h',
    })

    //seta cookie "token" no browser do usuário
    res.cookie('token', token, { httpOnly: true });

    console.log(`User ${req.user.username} authenticated with steam`)
    console.log(`Steam ID : ${req.user.steamid}`)

    res.render('authenticated', {
      //chamo render que por sua vez vai chamar /views/authenticated
      userid: req.user.id,
      username: req.user.username,
      lvl: req.user.impact,
      kdr: req.user.kdr,
      steamid: req.user.steamid,
      jwtToken: token,
      clientUrl: config.FRONTEND_URL,
    })
  },
)









// LIST ALL USERS //

userRouter.get(
    '',
    expressAsyncHandler(async (req, res) => {
      const users = await User.findAll({
        attributes: ['id', 'username', 'kdr', 'winPercentage', 'impact'],
      })
      res.send(users)
    }),
)

// LIST ALL CHECKED IN USERS //

userRouter.get(
    '/checkedin',
    expressAsyncHandler(async (req, res) => {
        const users = await Checkin.findAll({
        attributes: ['eventId', 'userId', 'username', 'userlvl', 'createdAt'],
        })
        res.send(users)
    }),
)

// CHECK USER IN //

userRouter.post(
  '/checkin',
  expressAsyncHandler(async (req, res) => {
    console.log(req.body);
    const checkin = new Checkin({
      eventId: 10,
      userId: req.body.userId,
      username: req.body.username,
      userlvl: req.body.userlvl,
    })

    const createdCheckin = await checkin.save()

    console.log(`User ${createdCheckin.username} checked in`)
    res.send({
      id: createdCheckin.id,
      eventid: createdCheckin.eventid,
      userid: createdCheckin.userid,
      username: createdCheckin.username,
      userlvl: createdCheckin.userlvl,
    })
  }),
)

// USER SIGNIN (USING??????) //
/*
userRouter.post(
  '/signin',
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
*/
// USER CREATE //

/*
userRouter.post(
  '/create',
  expressAsyncHandler(async (req, res) => {

    console.log("** Hello from Pawn **");
    console.log(req);

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

*/
export default userRouter;



  /*
  router.get('/api/auth/steam', passport.authenticate('steam', {session: false}))

router.get(
    '/api/users',
    expressAsyncHandler(async (req, res) => {
      const users = await User.findAll({
        attributes: ['id', 'username', 'kdr', 'winPercentage', 'impact'],
      })
      res.send(users)
    }),
  )
  */