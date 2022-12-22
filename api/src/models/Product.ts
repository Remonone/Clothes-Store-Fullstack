import mongoose, { Document } from 'mongoose'

export type ProductDocument = Document & {
  name: string
  price: number
  discount?: number
  availability: 'In stock' | 'Out of stock'
  category: string
  characteristics: object
  description: string[]
  tags: string[]
  images: string[]
  rating: number
  sales: number
  createdOn: string
  updatedOn: string
}

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 10,
  },
  discount: {
    type: Number,
    required: false,
    max: 99,
    min: 0,
  },
  availability: {
    type: String,
    required: true,
    enum: ['In stock', 'Out of stock'],
  },
  category: String,
  description: [String],
  characteristics: {
    type: Object,
    required: false,
  },
  tags: [String],
  images: [String],
  rating: Number,
  sales: Number,
  createdOn: {
    type: Date,
    default: Date.now,
  },
  updatedOn: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model<ProductDocument>('Product', productSchema)
