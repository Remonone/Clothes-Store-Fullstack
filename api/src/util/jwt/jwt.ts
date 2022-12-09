import {
  BadRequestError,
  InternalServerError,
  UnauthorizedError,
} from '../../helpers/apiError'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../secrets'

export const getToken = (data: { id: string; email: string }) => {
  try {
    const token = jwt.sign(data, JWT_SECRET)
    return token
  } catch (e) {
    throw new BadRequestError('Invalid data', 400, e)
  }
}

export const getData = (token: string) => {
  try {
    const data = jwt.verify(token, JWT_SECRET) as { id: string; email: string }
    return data
  } catch (e) {
    if (e instanceof jwt.NotBeforeError) {
      throw new UnauthorizedError('Not valid token', 403, e)
    }
    throw new InternalServerError('Internal Error', 500, e)
  }
}
