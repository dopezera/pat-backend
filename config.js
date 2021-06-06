const common = {
  PORT: process.env.PORT || 5000,
  FRONTEND_URL: process.env.FRONTEND_URL,
  SECRET_KEY: process.env.SECRET_KEY,

  passportOptions: {
    returnURL: `http://localhost:5000/api/auth/steam/return`,
    realm: `http://localhost:5000/api/`,
    apiKey: '64E6444F84EAC46E4F893426767A2F33',
  },
}

const config = {
  development: {
    ...common,
  },

  test: {
    ...common,
  },

  staging: {
    ...common,
  },

  production: {
    ...common,
  },
}

export default (environment => {
  if (!environment) environment = 'development'
  return config[process.env.NODE_ENV || environment]
})()
