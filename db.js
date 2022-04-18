import Sequelize from 'sequelize'
const sequelize = new Sequelize('pat-backend-db', 'root', 'apimix', {
  host: 'localhost',
  port: '3308',
  dialect: 'mysql',
  dialectOptions: {
    supportBigNumbers: true,
  },
})

export default sequelize
