import sequelize from '../../db.js'
import Sequelize from 'sequelize'

const Match = sequelize.define('matches', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  map: {
    type: Sequelize.STRING,
  },
  ct_score: {
    type: Sequelize.INTEGER,
  },
  t_score: {
    type: Sequelize.INTEGER,
  },
  m_winner: {
    type: Sequelize.INTEGER,
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
})

export default Match
