import sequelize from '../../db.js'
import Sequelize from 'sequelize'
import Pstats from './pstatsModel.js'

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

//Pstats.belongsTo(Match); //isso aqui tava on todo tempo tirei bóver
//Match.sync({force: true}).then(console.log('addei match'));

export default Match
