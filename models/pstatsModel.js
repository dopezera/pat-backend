import sequelize from '../db.js';
import Sequelize from 'sequelize';

import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import Match from './matchModel.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());

const Pstats = sequelize.define('pstats', {
    matchId: { 
        type: Sequelize.INTEGER,
        references: { model: 'matches', key: 'id' }
    },
    steamid: { 
        type: Sequelize.BIGINT,
        //references: { model: 'users', key: 'steamid' } -- removido pq estou usando loader com steamids que não existem
    },
    username: { 
        type: Sequelize.STRING
    },
    team: {
        type: Sequelize.INTEGER
    },
    winner: {
        type: Sequelize.BOOLEAN
    },
    kills: {
        type: Sequelize.INTEGER
    },
    assists: {
        type: Sequelize.INTEGER
    },
    deaths: {
        type: Sequelize.INTEGER
    },
    mvps: {
        type: Sequelize.INTEGER
    },
    score: {
        type: Sequelize.INTEGER
    }
});

//Pstats.sync({force: true});

export default Pstats;


/* isso aqui usei nada pra upar db
Pstats.addHook('afterCreate', 'updateImpact', async (pstats, options) => {

    const [user, created] = await User.findOrCreate({
        where: { steamid: pstats.steamid },
        defaults: {
          steamid: pstats.steamid,
          username: pstats.username,
          impact: 0,
          premium: 0
        }
      });
    
    const obj = calculatePlayerImpact(user.steamid);
    console.log(obj);

    user.impact = obj.impact;
    user.kdr = obj.kdr;
    user.winPercentage = obj.winPercentage;
    user.save();

  });
*/