import mongoose, { ObjectId } from 'mongoose'

export type ReviewDocument = Document & {
  name: string
  rating: number
  body: string
  author: string
  productId: ObjectId
  createdOn: Date
  updatedOn: Date
}

const reviewSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  body: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Product',
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  updatedOn: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model<ReviewDocument>('Review', reviewSchema)
