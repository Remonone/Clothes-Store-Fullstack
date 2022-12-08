import mongoose, { ObjectId } from 'mongoose'

export type ReviewDocument = Document & {
  name: string
  rating: number
  body: string
  author: string
  productId: ObjectId
}

const reviewSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  body: String,
  author: String,
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Product',
  },
})

export default mongoose.model<ReviewDocument>('Review', reviewSchema)
