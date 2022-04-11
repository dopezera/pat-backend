import sequelize from '../db.js'

const formatMatches = results => {
  let obj = {
    match_id: 0,
  }

  const matches = []

  const hash = results.reduce(
    (p, c) => (p[c.matchId] ? p[c.matchId].push(c) : (p[c.matchId] = [c]), p),
    {}
  )

  const newData = Object.keys(hash).map(k => ({matchId: k, pstats: hash[k]}))

  newData.map(details => {
    obj = {
      id: details.matchId,
      created: details.pstats[0].createdAt,
      map_name: details.pstats[0].map,
      ct_score: details.pstats[0].ct_score,
      t_score: details.pstats[0].t_score,
      winner: details.pstats[0].m_winner,
      players_details: details.pstats,
    }
    matches.push(obj)
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
