import sequelize from '../db.js'

const defineMatch = matchStat => {
  const match = {
    map: matchStat.map,
    ct_score: matchStat.ct_score,
    t_score: matchStat.t_score,
    m_winner: matchStat.m_winner,
    players: [],
  }
  return match
}

const definePlayer = matchStat => {
  let player = {
    steamid: matchStat.steamid,
    username: matchStat.username,
    team: matchStat.team,
    kills: matchStat.kills,
    assists: matchStat.assists,
    deaths: matchStat.deaths,
    mvps: matchStat.mvps,
    score: matchStat.score,
  }
  return player
}

const formatMatches = results => {
  let matches = []
  let previous = 0

  results.map(matchStat => {
    if (matchStat.matchId !== previous) {
      matches.push(defineMatch(matchStat))
      matches[matches.length - 1].players.push(definePlayer(matchStat))
      previous = matchStat.matchId
    } else {
      matches[matches.length - 1].players.push(definePlayer(matchStat))
    }
  })
  return matches
}

export const getMatchesInDb = () => {
  const allMatches = sequelize
    .query(
      'SELECT * FROM matches INNER JOIN pstats ON matches.id = pstats.matchId'
    )
    .then(([results, metadata]) => {
      return formatMatches(results)
    })
  return allMatches
}
