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

userRouter.get('/:id', getUser)
userRouter.get('/profile', profile)
userRouter.post('', createUser)
userRouter.get('/login', login)
userRouter.put('/avatar', avatar)
userRouter.put('/password', changePass)
userRouter.post('', deleteUser)

export default userRouter
