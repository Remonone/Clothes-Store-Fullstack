import { Router } from 'express'

import {
  createProduct,
  findById,
  findAll,
  filterByCategory,
  updateProduct,
  deleteProduct,
} from '../controllers/product.controller'

const router = Router()

router.post('/', createProduct)
router.get('/:id', findById)
router.get('/', findAll)
router.get('/category/:category', filterByCategory)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)

export default router
