import Sequelize from 'sequelize';
const sequelize = new Sequelize('apimix', 'root', 'apimix', {
    host: 'localhost',
    port: '3306',
    dialect: 'mysql',
    dialectOptions: {
      supportBigNumbers: true
    }
  });


export default sequelize;