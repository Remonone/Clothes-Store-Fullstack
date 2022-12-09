import { createUser, getUser, profile } from '../controllers/user.controller'
import { Router } from 'express'

const userRouter = Router()

userRouter.get('/:id', getUser)
userRouter.get('/profile', profile)
userRouter.post('', createUser)

export default userRouter
