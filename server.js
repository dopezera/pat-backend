import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import sequelize from './db.js';

import User from './models/userModel.js';
import Match from './models/matchModel.js';
import Pstats from './models/pstatsModel.js';

import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import { generateToken } from './utils.js';

dotenv.config();
//ainda nao adicionei a .env ao .gitignore como deve ser
const app = express();

app.use(express.json()); //allow json in the body of requests (signin backend in basir's video)
app.use(express.urlencoded({ extended: true })); //with this 2 middleware all requests that contain data will translate to req.body

app.use(bodyParser.json());

app.get('/api/matches', expressAsyncHandler(async (req, res) => {
    const [results, metadata] = await sequelize.query("SELECT * FROM matches INNER JOIN pstats ON matches.id = pstats.matchId");
    //for each result, get result.matchId then go to match and verify winner then compare winner with pstats.team and set winner

    let obj = {
        match_id: 0,
    }

    const matches = [];

    const hash = results.reduce((p,c) => (p[c.matchId] ? p[c.matchId].push(c) : p[c.matchId] = [c],p) ,{});
    const newData = Object.keys(hash).map(k => ({matchId: k, pstats: hash[k]}));
    newData.map((details) => {
        obj = {
            id: details.matchId,
            created: details.pstats[0].createdAt,
            map_name: details.pstats[0].map,
            ct_score: details.pstats[0].ct_score,
            t_score: details.pstats[0].t_score,
            winner: details.pstats[0].m_winner,
            players_details: details.pstats, 
        }
        matches.push(obj);
    }) 
    res.send(matches);
})
);

app.get('/api/users', expressAsyncHandler(async (req, res) => {
    const users = await User.findAll({
        attributes: ['id', 'username','kdr','winPercentage','impact']
    });
    res.send(users);
})
);

//ja consigo fazer um post pedindo login de boa só que agora preciso testar com um user que de fato tem senha criptografada
//proximos passos: 1 - inserir users direto no banco 2 - rodar consulta pra ver se bate o ok de login retornando token
//com isso feito: concluir tela de cadastro de usuário e montar tela de login

app.post('/api/user/signin', expressAsyncHandler(async (req,res) => {
    const user = await User.findOne({ where: { email: req.body.email } });
    if(user) {
        if(bcrypt.compareSync(req.body.password, user.password)) {
            res.send({
                id: user.id,
                username: user.username,
                lvl: user.impact,
                token: generateToken(user)
            });
            return;
        }
    }
    res.status(401).send({message: 'Invalid email or password'});
}))

app.post('/api/user/create', expressAsyncHandler(async (req, res) => {
    const user = new User({
        username: req.body.username,
        steamid: req.body.steamid,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    })
    const createdUser = await user.save();
    res.send({
        id: createdUser.id,
        username: createdUser.username,
        token: generateToken(createdUser)
    });
})
);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Serve at http://0.0.0.0:${port}`);
});

//xablau
/* a
app.get('/api/script/2', expressAsyncHandler(async (req, res) => {
    const [results, metadata] = await sequelize.query("SELECT * FROM matches INNER JOIN pstats ON matches.id = pstats.matchId");
    results.map( (result) => {

        let kdr = result.

        User.findOrCreate({
            where: {
                steamid: result.steamid
            },
            defaults: {
                steamid: result.steamid,
                username: result.username,
            }
        }).then(result =>
            console.log(result)
          )
          .catch(err =>
            console.log(err)
          )

        let kdr_query = "SELECT SUM(kills)FROM pstats WHERE steamid = "+result.steamid+" AND team > 1)/(SELECT SUM(deaths) FROM pstats WHERE steamid = "+result.steamid+" AND team > 1)"
        console.log(kdr_query);
        //const [kdr, metadata] = await sequelize.query(kdr_query);
        //let winPercentage = ;
        //let impact = ;

        //Users.update()
    })
}))

app.get('/api/script', expressAsyncHandler(async (req, res) => {
    const [results, metadata] = await sequelize.query("SELECT * FROM matches INNER JOIN pstats ON matches.id = pstats.matchId");
    results.map( (result) => {

        let matchId = result.matchId;

        if (result.team > 1) { //se o cara NÃO é spec
            if (result.team != result.m_winner) { //se o cara perdeu
                Pstats.update(
                    { winner: 0 },
                    { where: {
                        matchId: matchId,
                        team: result.team
                    }}
                ).then(result =>
                    console.log(result)
                  )
                  .catch(err =>
                    console.log(err)
                  )
            } 
            else //se o cara ganhou
            {
                Pstats.update(
                    { winner: 1 },
                    { where: {
                        matchId: matchId,
                        team: result.team
                    }}
                ).then(result =>
                    console.log(result)
                  )
                  .catch(err =>
                    console.log(err)
                  )
            }
        }
    })
})
);
*/
