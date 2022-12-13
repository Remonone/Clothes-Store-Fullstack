import { BadRequestError } from '../helpers/apiError'
import User from '../models/User'
import userService from '../services/user.service'
import bcrypt from 'bcrypt'
import { Request, Response, NextFunction } from 'express'
import { AWS_BUCKET, AWS_REGION } from '../util/secrets'
import { getData, getToken } from '../util/jwt/jwt'

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
  try {
    const { username, email, password } = req.body
    const encryptedPass = bcrypt.hashSync(password, 10)
    const user = new User({
      username,
      email,
      password: encryptedPass,
      avatar: `https://${AWS_BUCKET}.s3.${AWS_REGION}.amazonaws.com/images/${username}.png`,
      cart: [],
    })
    const createdUser = await userService.create(user)
    return res.json(createdUser)
  } catch (e) {
    if (e instanceof Error && e.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, e))
    } else {
      next(e)
    }
  }
}
// POST -> /users/login
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body
    const user = await userService.loginUser(email, password)
    const token = getToken({ id: user._id, email: user.email })
    return res.status(200).json({ webToken: token })
  } catch (e) {
    if (e instanceof Error && e.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, e))
    } else {
      next(e)
    }
  }
}

// PUT -> /users/avatar
export const avatar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { webToken } = req.headers
    const avatar: Buffer = req.body
    const data = getData(webToken as string)
    const user = userService.editAvatar(data.id, avatar)
    return res.status(200).json(user)
  } catch (e) {
    if (e instanceof Error && e.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, e))
    } else {
      next(e)
    }
  }
}
// PUT -> /users/password
export const changePass = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { webToken, newPassword } = req.body
    const data = getData(webToken)
    const user = await userService.changePassword(data.id, newPassword)
    return res.status(200).json(user)
  } catch (e) {
    if (e instanceof Error && e.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, e))
    } else {
      next(e)
    }
  }
}
// DELETE -> /users
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { webToken } = req.body
    const data = getData(webToken)
    const user = userService.deleteUser(data.id)
    return user
  } catch (e) {
    if (e instanceof Error && e.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, e))
    } else {
      next(e)
    }
  }
}

// GET -> /users/profile
export const profile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const webToken = req.headers.authorization
    const user = await userService.profile(webToken as string)
    return res.json(user)
  } catch (e) {
    if (e instanceof Error && e.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, e))
    } else {
      next(e)
    }
  }
}
