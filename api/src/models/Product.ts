import mongoose from 'mongoose'

export type ProductDocument = Document & {
  name: string
  price: number
  discount: number
  availability: 'In stock' | 'Out of stock'
  category: string
  characteristics: object
  description: string[]
}

const productSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    index: true,
  },
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
    max: 100,
    min: 1,
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
})

export default mongoose.model<ProductDocument>('Product', productSchema)
