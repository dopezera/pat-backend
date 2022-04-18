import sequelize from '../../db.js'
import Sequelize from 'sequelize'

const User = sequelize.define('users', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
  },
  steamid: {
    type: Sequelize.BIGINT,
    unique: true,
    allowNull: false,
  },
  kdr: {
    type: Sequelize.FLOAT,
    defaultValue: 0,
  },
  winPercentage: {
    type: Sequelize.FLOAT,
    defaultValue: 0,
  },
  impact: {
    type: Sequelize.FLOAT,
    defaultValue: 0,
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  plan: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
})

//User.sync({force: true});

export default User
