import Avatar from 'avatar-builder'
import awsS3Service from '../aws/aws.s3.service'
import {
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from '../helpers/apiError'
import User, { UserDocument } from '../models/User'
import { getData } from '../util/jwt/jwt'
import bcrypt from 'bcrypt'

const create = async (user: UserDocument): Promise<UserDocument | null> => {
  const possibleUser = await User.find({ email: user.email })
  if (possibleUser)
    throw new ForbiddenError('User with this email already exist')
  const createdUser = await user.save()

  const avatar = Avatar.triangleBuilder(256)
  avatar.create(user.username).then((buffer) => {
    awsS3Service.aws_put({
      key: `users/${createdUser._id}/images/avatar.png`,
      body: buffer,
    })
  })

  return createdUser
}

const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email })
  if (!user) throw new NotFoundError('User with that email doesn\'t exist')
  if (!bcrypt.compareSync(password, user.password))
    throw new UnauthorizedError('Authentication error')
  return user
}

const getUserById = async (id: string) => {
  const user = await User.findById(id)
  if (!user) throw new NotFoundError(`User ${id} was not found`)
  const userToReturn = {
    username: user.username,
    avatar: user.avatar,
  }
  return userToReturn
}

const editAvatar = async (id: string, newAvatar: Buffer) => {
  const user = await User.findById(id)
  if (!user) throw new NotFoundError(`User ${id} was not found`)
  awsS3Service.aws_delete(`users/${user.id}/images/avatar.png`)
  awsS3Service.aws_put({
    key: `users/${id}/images/avatar.png`,
    body: newAvatar,
  })
  return user
}

const changePassword = async (id: string, newPassword: string) => {
  const encryptedPass = bcrypt.hashSync(newPassword, 10)
  const user = await User.findByIdAndUpdate(
    id,
    { password: encryptedPass },
    {
      new: true,
    }
  )
  if (!user) throw new NotFoundError(`User ${id} was not found`)
  return user
}

const deleteUser = async (id: string): Promise<UserDocument | null> => {
  const user = await User.findByIdAndDelete(id)
  if (!user) throw new NotFoundError(`User ${id} was not found`)
  awsS3Service.aws_delete(`users/${id}`)
  return user
}

const profile = async (webToken: string) => {
  const data = getData(webToken)
  const user = await User.findById(data.id)
  return user
}

export default {
  create,
  getUserById,
  editAvatar,
  changePassword,
  deleteUser,
  profile,
  loginUser,
}
