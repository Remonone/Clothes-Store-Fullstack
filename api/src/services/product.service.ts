import { NotFoundError } from '../helpers/apiError'
import Product from '../models/Product'
import { ProductDocument } from '../models/Product'

const create = async (product: ProductDocument): Promise<ProductDocument> => {
  return product.save()
}

const findById = async (productId: string): Promise<ProductDocument> => {
  const product = await Product.findById(productId)
  if (!product) {
    throw new NotFoundError(`Product ${productId} was not found`)
  }
  return product
}

const findAll = async (): Promise<ProductDocument[]> => {
  const productList = await Product.find()
  return productList
}

const filterByCategory = async (
  category: string
): Promise<ProductDocument[]> => {
  const products = await Product.find({ category: category })
  if (!products) throw new NotFoundError(`Category ${category} was not found`)
  return products
}

const update = async (
  productId: string,
  update: Partial<ProductDocument>
): Promise<ProductDocument | null> => {
  const foundProduct = await Product.findByIdAndUpdate(productId, update, {
    new: true,
  })
  if (!foundProduct)
    throw new NotFoundError(`Product ${productId} was not found`)
  return foundProduct
}

const deleteProduct = async (
  productId: string
): Promise<ProductDocument | null> => {
  const foundProduct = await Product.findByIdAndDelete(productId)
  if (!foundProduct)
    throw new NotFoundError(`Product ${productId} was not found`)
  return foundProduct
}

export default {
  create,
  findById,
  findAll,
  filterByCategory,
  update,
  deleteProduct,
}
