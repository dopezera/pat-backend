import Match from "../models/matchModel.js";
import Pstats from "../models/pstatsModel.js";
import expressAsyncHandler from 'express-async-handler'
import express from 'express'

const pstatsLoader = express.Router();

pstatsLoader.get(
    '/loader',
    expressAsyncHandler(async (req, res) => {

        let i = 1, j = 0, pTeam;

      for (i = 1; i < 21; i++) {
          const match = new Match({
              map: "de_mirage",
              ct_score: 16,
              t_score: 14,
              m_winner: 3,
          })

          const createdMatch = await match.save()

          for (j = 0; j <= 10; j++){
              j%2 == 0 ? pTeam = 2 : pTeam = 3
            const pstat = new Pstats({
                matchId: createdMatch.id,
                steamid: 44444,
                username: "usuario",
                team: pTeam,
                winner: 3,
                kills: 20,
                assists: 4,
                deaths: 20,
                mvps: 3,
                score: 60,
              })

              const createdPstat = await pstat.save()
              //console.log(createdPstat);
          }
      }
      res.send({ status: "ok" })
    }),
  )

  export default pstatsLoader;