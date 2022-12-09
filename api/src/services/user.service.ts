import awsS3Service from '../aws/aws.s3.service'
import { NotFoundError } from '../helpers/apiError'
import User, { UserDocument } from '../models/User'
import { getData } from '../util/jwt/jwt'
import { AWS_BUCKET } from '../util/secrets'

const create = async (
  user: UserDocument,
  avatar: Buffer
): Promise<UserDocument> => {
  awsS3Service.aws_put({
    Bucket: AWS_BUCKET,
    Key: `images/${user.username}.png`,
    Body: avatar,
  })
  return user.save()
}

const getUserById = async (_id: string): Promise<UserDocument> => {
  const user = await User.findById(_id)
  if (!user) throw new NotFoundError(`User ${_id} was not found`)
  return user
}

const editAvatar = async (id: string, newAvatar: Buffer) => {
  const user = await User.findById(id)
  if (!user) throw new NotFoundError(`User ${id} was not found`)
  awsS3Service.aws_delete({
    Bucket: AWS_BUCKET,
    Key: `images/${user.username}`,
  })
  awsS3Service.aws_put({
    Bucket: AWS_BUCKET,
    Key: `images/${user.username}`,
    Body: newAvatar,
  })
  return user
}

const changePassword = async (id: string, newPassword: string) => {
  const user = await User.findByIdAndUpdate(
    id,
    { password: newPassword },
    {
      new: true,
    }
  )
  if (!user) throw new NotFoundError(`User ${id} was not found`)
  return user
}

const changeUsername = async (id: string, newUsername: string) => {
  const user = await User.findByIdAndUpdate(
    id,
    { username: newUsername },
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
  return user
}

const profile = async (webToken: string): Promise<UserDocument> => {
  const data = getData(webToken)
  const user = await getUserById(data.id)
  return user
}

export default {
  create,
  getUserById,
  editAvatar,
  changePassword,
  changeUsername,
  deleteUser,
  profile,
}
