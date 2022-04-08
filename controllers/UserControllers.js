import User from '../models/userModel.js'

export const getAllUsers = 
    (req, res) => {
        User.findAll({
          attributes: ['id', 'username', 'kdr', 'winPercentage', 'impact'],
        }).then(users => {
          return res.send(users)
        })
      }
export default getAllUsers;