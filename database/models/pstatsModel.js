import sequelize from '../../db.js'
import Sequelize from 'sequelize'

import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'

dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(bodyParser.json())

const Pstats = sequelize.define('pstats', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  matchId: {
    type: Sequelize.INTEGER,
    references: {model: 'matches', key: 'id'},
  },
  steamid: {
    type: Sequelize.BIGINT,
    //references: { model: 'users', key: 'steamid' } -- removido pq estou usando loader com steamids que não existem
  },
  username: {
    type: Sequelize.STRING,
  },
  team: {
    type: Sequelize.INTEGER,
  },
  winner: {
    type: Sequelize.BOOLEAN,
  },
  kills: {
    type: Sequelize.INTEGER,
  },
  assists: {
    type: Sequelize.INTEGER,
  },
  deaths: {
    type: Sequelize.INTEGER,
  },
  mvps: {
    type: Sequelize.INTEGER,
  },
  score: {
    type: Sequelize.INTEGER,
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
})

export default Pstats
