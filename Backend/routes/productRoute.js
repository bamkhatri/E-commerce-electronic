const express = require('express')
const productController = require('../controllers/productController')
const { isAuthenticatedUser, authorizeRoles } = require('../Middleware/auth')

const router = express.Router()

router.post(
  '/create',
  isAuthenticatedUser,
  authorizeRoles('admin'),
  productController.createProduct
)
router.get('/read', productController.getAllProduct)
router.put(
  '/update/:id',
  isAuthenticatedUser,
  authorizeRoles('admin'),
  productController.updateProduct
)
router.delete(
  '/delete/:id',
  isAuthenticatedUser,
  authorizeRoles('admin'),
  productController.deleteProduct
)
router.get('/read/:id', productController.getProductDetails)

module.exports = router
