import User from '../models/userModel.js'
import expressAsyncHandler from 'express-async-handler'

export const getAllUsers = 
    expressAsyncHandler(async (req, res) => {
        const users = await User.findAll({
          attributes: ['id', 'username', 'kdr', 'winPercentage', 'impact'],
        })
        return res.send(users)
      })

export default getAllUsers;