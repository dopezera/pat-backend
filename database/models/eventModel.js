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

export default Event
