import { Request, Response, NextFunction } from 'express'
import Product from '../models/Product'
import productService from '../services/product.service'
import { BadRequestError } from '../helpers/apiError'

// POST -> /products/
export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      name,
      price,
      availability,
      category,
      characteristics,
      description,
    } = req.body
    const product = new Product({
      name,
      price,
      availability,
      category,
      characteristics,
      description,
    })
    await productService.create(product)
    res.status(200).json(product)
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
    res.json(await productService.findAll())
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
    res.json(await productService.filterByCategory(category))
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
    const { update } = req.body
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
