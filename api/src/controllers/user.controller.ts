import { BadRequestError } from '@api/helpers/apiError'
import userService from '@api/services/user.service'
import { getData } from '@api/util/jwt/jwt'
import { Request, Response, NextFunction } from 'express'

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
