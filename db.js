import Sequelize from 'sequelize';
const sequelize = new Sequelize('naO4DU6RTQ', 'naO4DU6RTQ', 'kAVVk1mlPj', {
    host: 'remotemysql.com',
    port: '3306',
    dialect: 'mysql',
    dialectOptions: {
      supportBigNumbers: true
    }
  });


export default sequelize;