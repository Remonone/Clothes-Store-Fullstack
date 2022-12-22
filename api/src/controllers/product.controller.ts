import { Request, Response, NextFunction } from 'express'
import Product from '../models/Product'
import productService from '../services/product.service'
import { BadRequestError } from '../helpers/apiError'
import awsS3Service from '../aws/aws.s3.service'
import { AWS_BUCKET, AWS_REGION } from '../util/secrets'

interface SearchQuery {
  offset?: number
  limit?: number
  sort?: any
}
interface Product {
  name: string
  price: number
  discount?: number
  availability: 'In stock' | 'Out of stock'
  category: string
  characteristics: object
  description: string[]
  tags: string[]
  images: File[]
  rating: number
}

// POST -> /products/
export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = req.body as Product
    const imageLinks: string[] = []
    const productName = product.name.replace(/ /g, '_')
    if (!req.files || Object.keys(req.files).length === 0)
      throw new BadRequestError('No files provided')
    product.images.forEach((item, index) => {
      //FIX BUG
      imageLinks.push(
        `https://${AWS_BUCKET}.s3.${AWS_REGION}.amazonaws.com/product/${productName}/images/${
          productName + index
        }.png`
      )
    })
    const newProduct = new Product({
      name: product.name,
      price: product.price,
      discount: product.discount || 0,
      availability: product.availability,
      category: product.category,
      characteristics: product.characteristics,
      description: product.description,
      tags: product.tags,
      images: imageLinks,
      rating: product.rating,
    })
    const createdProduct = await productService.create(newProduct)
    product.images.forEach((item, index) => {
      awsS3Service.aws_put({
        key: `product/${productName}/images/${item.name}.${item.type}`,
        body: item.arrayBuffer,
      })
    })
    return res.status(200).json(createdProduct)
  } catch (e) {
    if (e instanceof Error && e.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, e))
    } else {
      next(e)
    }
  }
}

// GET -> /products/:id
export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    res.json(await productService.findById(id))
  } catch (e) {
    if (e instanceof Error && e.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, e))
    } else {
      next(e)
    }
  }
}
// GET -> /products/
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { offset, limit, sort } = req.query as SearchQuery
    res.json(await productService.findAll(offset, limit, sort))
  } catch (e) {
    if (e instanceof Error && e.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, e))
    } else {
      next(e)
    }
  }
}
// GET -> /products/category/:category
export const filterByCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { category } = req.params
    const { offset, limit, sort } = req.query as SearchQuery
    res.json(
      await productService.filterByCategory(category, offset, limit, sort)
    )
  } catch (e) {
    if (e instanceof Error && e.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, e))
    } else {
      next(e)
    }
  }
}
// PUT -> /products/:id
export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const { id } = req.params
    const updatedProduct = await productService.update(id, update)
    res.json(updatedProduct)
  } catch (e) {
    if (e instanceof Error && e.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, e))
    } else {
      next(e)
    }
  }
}
// DELETE -> /products/:id
export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    await productService.deleteProduct(id)
    return res.status(204).end()
  } catch (e) {
    if (e instanceof Error && e.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, e))
    } else {
      next(e)
    }
  }
}

export const getBest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { offset, limit } = req.body as SearchQuery
    const best = await productService.getBestProducts(offset, limit)
    return best
  } catch (e) {
    if (e instanceof Error && e.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, e))
    } else {
      next(e)
    }
  }
}
