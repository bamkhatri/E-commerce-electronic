const express = require('express')
const productController = require('../controllers/productController')

const router = express.Router()

router.post('/create', productController.createProduct)
router.get('/read', productController.getAllProduct)
router.put('/update/:id', productController.updateProduct)
router.delete('/delete/:id', productController.deleteProduct)
router.get('/read/:id', productController.getProductDetails)

module.exports = router
