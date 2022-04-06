import jwt from 'jsonwebtoken' 
import config from '../config.js';
import {Strategy} from 'passport-steam'
import passport from 'passport'
import User from '../models/userModel.js'

export function verifyAuth(req, res, next) {

      if(!req.cookies.token) {
        return res.status(401).send('NÃO AUTORIZADO')
      }
    
      jwt.verify(req.cookies.token, config.SECRET_KEY, (err, decoded) => {
        if (err){
          console.log(err);
          req.authenticated = false;
          req.decoded = null;
          return res.status(500).send('ERRO')
      } else {
          //console.log("Deu certo");
          req.decoded = decoded;
          req.authenticated = true;
          next();
      }
      })
  }

  export function isAuth(req, res) {
    if(!req.cookies.token) {
      return res.status(401).send('NÃO AUTORIZADO')
    }
  
    jwt.verify(req.cookies.token, config.SECRET_KEY, (err, decoded) => {
      if (err){
        console.log(err);
        req.authenticated = false;
        req.decoded = null;
        return res.status(500).send('ERRO')
    } else {
        //console.log("Deu certo");
        req.decoded = decoded;
        req.authenticated = true;
        res.send(req.decoded.user)
    }
    })
  }

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

  export function getAuthUser(req, res) {
    const token = jwt.sign({user: req.user}, config.SECRET_KEY, {
      expiresIn: '8h',
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
      impact: req.user.impact,
      winPercentage: req.user.winPercentage,
      steamid: req.user.steamid,
      jwtToken: token,
      clientUrl: config.FRONTEND_URL,
    })
}


