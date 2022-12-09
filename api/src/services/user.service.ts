import { NotFoundError } from '@api/helpers/apiError'
import User, { UserDocument } from '@api/models/User'
import { getData } from '@api/util/jwt/jwt'

const create = async (user: UserDocument): Promise<UserDocument> => {
  return user.save()
}

const getUserById = async (_id: string): Promise<UserDocument> => {
  const user = await User.findById(_id)
  if (!user) throw new NotFoundError(`User ${_id} was not found`)
  return user
}

const editAvatar = async () => {
  return null
}

const changePassword = async () => {
  return null
}

const changeUsername = async () => {
  return null
}

const deleteUser = async () => {
  return null
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
