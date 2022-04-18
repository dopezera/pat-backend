import Pstats from './database/models/pstatsModel.js'

export const calculatePlayerImpact = steamid => {
  const games_played = Pstats.count({
    where: {
      steamid: steamid,
    },
  })
  const wins = Pstats.count({
    where: {
      steamid: steamid,
      winner: true,
    },
  })

  const kills = Pstats.sum('kills', {
    where: {
      steamid: steamid,
    },
  })

  const deaths = Pstats.sum('deaths', {
    where: {
      steamid: steamid,
    },
  })

  const winPercentage = wins / games_played
  const kdr = kills / deaths

  const impact = winPercentage * kdr

  const obj = {
    winPercentage: winPercentage,
    kdr: kdr,
    impact: impact,
  }

  return obj
}
