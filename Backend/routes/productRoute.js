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
router.put(
  '/create/review',
  isAuthenticatedUser,
  productController.createProductReview
)
router.get('/reviews', productController.getAllProductReviews)
router.delete('/reviews', isAuthenticatedUser, productController.deleteReview)
module.exports = router
