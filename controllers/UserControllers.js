import {getUsersInDb} from '../repository/UserRepo.js'

export const getAllUsers = (req, res) => {
  getUsersInDb().then(users => {
    if (!users) {
      return res.status(404).end()
    }
    return res.send(users)
  })
}
