import {getMatchesInDb} from '../repository/MatchRepo.js'

export const getAllMatches = (req, res) => {
  getMatchesInDb().then(matches => {
    if (!matches) {
      res.status(404).end()
    }
    return res.send(matches)
  })
}
