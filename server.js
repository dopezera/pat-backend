
import User from './models/userModel.js'

import bodyParser from 'body-parser'
import config from './config.js'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'

import passport from 'passport'

import routes from './routes.js'

dotenv.config()
const app = express()

//app.use(cors({ origin: 'https://mixstats.herokuapp.com', credentials: true}));
app.use(cors())
app.use(express.json()) //allow json in the body of requests (signin backend in basir's video)
app.use(express.urlencoded({extended: true})) //with this 2 middleware all requests that contain data will translate to req.body
app.use(bodyParser.json())

/** BAGUI DA STEAM */

app.set('view engine', 'ejs')
app.set('views', '/views')



app.use(passport.initialize())

app.set('view engine', 'ejs')
app.set('views', './views')

app.use(routes)

app.listen(config.PORT, () => {
  console.log(`Serve at http://localhost:${config.PORT}`)
})
