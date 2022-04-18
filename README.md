# MixCSGO backend

```
After cloning the project.

1 - Install all dependencies
npm i

2- Run project with Nodemon
npm run dev

Project routes are secured and require you to be authenticated. As I carry out my API tests using Postman and I don't know how to configure the jwt token to be received by it, what I currently do is login through the frontend of the application, get the authentication token in the browser cookies and register in Postman.

You can also navigate using the frontend of the application itself. All API routes are defined in routes.js.
```

# DATABASE

MySQL 5.7 is used in the project because later versions are not supported by the CS GO plugin that records the results of matches.

You should create a local MySQL DB and adjust its configurations in /database/config/config.json and in your .env file (see .env.example to find out wich are our systems environment variables). We are using sequelize and sequelize migrations.

Create tables. Go to /database directory and run:
npx sequelize-cli migrate:db

You should be good to go!
