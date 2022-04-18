import dotenv from 'dotenv'
dotenv.config()

console.log(process.env.DB_NAME)

export default {
  development: {
    username: 'root',
    password: 'apimix',
    database: 'pat-backend-db',
    host: 'localhost',
    port: '3308',
    dialect: 'mysql',
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
}
