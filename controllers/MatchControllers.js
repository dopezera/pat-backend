import {getMatchesInDb} from '../Repository/MatchRepo.js'

export const getAllMatches = (req, res) => {
  getMatchesInDb().then(matches => {
    if (!matches) {
      res.status(404).end()
    }
    return res.send(matches)
  })
}

export default getAllMatches
