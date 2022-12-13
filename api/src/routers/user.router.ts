import {
  avatar,
  changePass,
  createUser,
  deleteUser,
  getUser,
  login,
  profile,
} from '../controllers/user.controller'
import { Router } from 'express'

const userRouter = Router()
userRouter.get('/profile', profile)
userRouter.post('/login', login)
userRouter.get('/:id', getUser)
userRouter.put('/avatar', avatar)
userRouter.put('/password', changePass)
userRouter.post('', createUser)
userRouter.delete('', deleteUser)

export default userRouter
