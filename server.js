
import bodyParser from 'body-parser'
import config from './config.js'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'

import passport from 'passport'

import routes from './routes.js'
import cookieParser from 'cookie-parser'

dotenv.config()
const app = express()

app.use(cors({ origin: 'http://localhost:3000', credentials: true})); //tem que ter cors setado para origem da requisição senão cookies vai flopar. tem gambiarra mas nao vale a pena (cors refletido é vulnerabilidade).
app.use(express.json()) //allow json in the body of requests (signin backend in basir's video)
app.use(express.urlencoded({extended: true})) //this line allows us to access information from a form. with this 2 middleware all requests that contain data will translate to req.body
app.use(bodyParser.json())

app.use(cookieParser());

//usar eslint e prettier

//jwt decode pra pegar user e salvar em req.user (exemplo)
//
app.set('view engine', 'ejs')
app.set('views', '/views')

app.use(passport.initialize())

app.set('view engine', 'ejs')
app.set('views', './views')

app.use(routes)

app.listen(config.PORT, () => {
  console.log(`Serve at http://localhost:${config.PORT}`)
})
