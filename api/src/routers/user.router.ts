import { getUser, profile } from '@api/controllers/user.controller'
import { Router } from 'express'

const userRouter = Router()

userRouter.get('/:id', getUser)
userRouter.get('/profile', profile)

export default userRouter
