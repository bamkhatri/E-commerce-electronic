const express = require('express')
const orderController = require('../controllers/orderController')

const router = express.Router()
const { isAuthenticatedUser, authorizeRoles } = require('../Middleware/auth')

router.get('/order/me', isAuthenticatedUser, orderController.getAllMyOrder)
router.post('/order/create', isAuthenticatedUser, orderController.newOrder)
router.get(
  '/order/:id',
  isAuthenticatedUser,
  authorizeRoles('admin'),
  orderController.orderDetails
)
router.get(
  '/admin/order',
  isAuthenticatedUser,
  authorizeRoles('admin'),
  orderController.getAllOrders
)
router.put(
  '/admin/order/:id',
  isAuthenticatedUser,
  authorizeRoles('admin'),
  orderController.updateOrderStatus
)
router.delete(
  '/admin/order/:id',
  isAuthenticatedUser,
  authorizeRoles('admin'),
  orderController.deleteOrder
)

module.exports = router
