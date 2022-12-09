import { BadRequestError } from '../helpers/apiError'
import User from '../models/User'
import userService from '../services/user.service'
import bcrypt from 'bcrypt'
import { Request, Response, NextFunction } from 'express'
import Avatar from 'avatar-builder'
import fs from 'fs'
import { AWS_BUCKET, AWS_REGION } from '../util/secrets'

// GET -> /users/:id
export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const user = await userService.getUserById(id)
    return res.json(user)
  } catch (e) {
    if (e instanceof Error && e.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, e))
    } else {
      next(e)
    }
  }
}
// POST -> /users
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email, password } = req.body
  const encryptedPass = bcrypt.hashSync(password, 10)
  const user = new User({
    username,
    email,
    password: encryptedPass,
    avatar: `https://${AWS_BUCKET}.s3.${AWS_REGION}.amazonaws.com/images/${username}.png`,
    cart: [],
  })
  const avatar = Avatar.triangleBuilder(256)
  await avatar.create(username).then((buffer) => {
    const createdUser = userService.create(user, buffer)
    return res.json(createdUser)
  })
}
// PUT -> /users/avatar
// PUT -> /users/password
// PUT -> /users/username
// DELETE -> /users/:id
// GET -> /users/profile
export const profile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { webToken } = req.body
    const user = userService.profile(webToken)
    return res.json(user)
  } catch (e) {
    if (e instanceof Error && e.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, e))
    } else {
      next(e)
    }
  }
}
