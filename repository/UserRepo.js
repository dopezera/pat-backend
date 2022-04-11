import User from '../models/userModel.js'

export const getUsersInDb = () => {
  const allUsers = User.findAll({
    attributes: ['id', 'username', 'kdr', 'winPercentage', 'impact'],
  }).then(users => {
    return users
  })
  return allUsers
}
