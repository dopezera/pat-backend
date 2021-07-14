import Sequelize from 'sequelize';
const sequelize = new Sequelize('sql10425329', 'sql10425329', 'iWWSmlSZSL', {
    host: 'sql10.freemysqlhosting.net',
    port: '3306',
    dialect: 'mysql',
    dialectOptions: {
      supportBigNumbers: true
    }
  });


export default sequelize;