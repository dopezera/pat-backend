import sequelize from '../../db.js'
import Sequelize from 'sequelize'

const Event = sequelize.define('events', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  description: {
    type: Sequelize.STRING,
  },
  status: {
    type: Sequelize.STRING,
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
})

//Pstats.belongsTo(Match); //isso aqui tava on todo tempo tirei bóver //nao usei de novo agora voltando a pegar no projeto

//Event.sync({force: true});

export default Event
