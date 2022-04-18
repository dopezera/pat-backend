import sequelize from '../../db.js'
import Sequelize from 'sequelize'
import Event from './eventModel.js'

const Checkin = sequelize.define('checkins', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  eventId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'events',
      key: 'id',
    },
  },
  userId: {
    type: Sequelize.BIGINT,
    references: {
      model: 'users',
      key: 'steamid',
    },
  },
  username: {
    type: Sequelize.STRING,
  },
  userlvl: {
    type: Sequelize.FLOAT,
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
})

Checkin.belongsTo(Event) //isso aqui tava on todo tempo tirei bóver
//Checkin.sync({force: true});
export default Checkin
