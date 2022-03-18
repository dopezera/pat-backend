const common = {
  PORT: process.env.PORT || 5000,
  SECRET_KEY: process.env.SECRET_KEY || '1391057e-20e8-4d9d-b384-a0f769ea19b0',
}

const config = {
  development: {
    ...common,
    FRONTEND_URL: 'http://localhost:3000',
    BACKEND_URL: 'http://localhost:5000',

    passportOptions: {
      returnURL: `http://localhost:5000/api/users/auth/steam/return`,
      realm: `http://localhost:5000/api/`,
      apiKey: '64E6444F84EAC46E4F893426767A2F33',
    },
  },

  production: {
    ...common,
    FRONTEND_URL: 'https://mixcsgo.herokuapp.com',
    BACKEND_URL: 'https://api-mixcsgo.herokuapp.com',

    passportOptions: {
      returnURL: `https://api-mixcsgo.herokuapp.com/api/users/auth/steam/return`,
      realm: `https://api-mixcsgo.herokuapp.com/api/`,
      apiKey: '64E6444F84EAC46E4F893426767A2F33',
    },
  },
}

export default (environment => {
  if (!environment) environment = 'development'
  return config[process.env.NODE_ENV || environment]
})()
