import mongoose, { Document, ObjectId } from 'mongoose'

interface CartItem {
  productId: ObjectId
  count: number
}

export type UserDocument = Document & {
  username: string
  email: string
  password: string
  avatar: string
  role: 'Customer' | 'Admin'
  cart: CartItem[]
  favorite: string[]
  createdOn: Date
  updatedOn: Date
}

const cartSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Product',
  },
  count: {
    type: Number,
    required: true,
  },
})
const favoriteSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Product',
  },
})

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['Customer', 'Admin'],
  },
  cart: [cartSchema],
  favorite: [favoriteSchema],
  createdOn: {
    type: Date,
    default: Date.now,
  },
  updatedOn: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model<UserDocument>('User', userSchema)
