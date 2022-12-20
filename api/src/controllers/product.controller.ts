import { Request, Response, NextFunction } from 'express'
import Product from '../models/Product'
import productService from '../services/product.service'
import { BadRequestError } from '../helpers/apiError'
import awsS3Service from '../aws/aws.s3.service'
import { AWS_BUCKET, AWS_REGION } from '../util/secrets'

interface SearchQuery {
  offset?: number
  limit?: number
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
  images: Buffer[]
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
    product.images.forEach((item, index) => {
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
        key: `product/${productName}/images/${productName + index}.png`,
        body: item,
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
    const { offset, limit } = req.query as SearchQuery
    res.json(await productService.findAll(offset, limit))
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
    const { offset, limit } = req.query as SearchQuery
    res.json(await productService.filterByCategory(category, offset, limit))
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
