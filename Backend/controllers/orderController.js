const Order = require('../models/orderModel')
const Product = require('../models/productModel')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../Middleware/catchAsyncError')

//Creating new order
exports.newOrder = catchAsyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body
  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user.id,
  })

  res.status(201).json({
    success: true,
    order,
  })
})

//Get Single order
exports.orderDetails = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )
  if (!order) {
    return next(
      new ErrorHandler(`Order not found with this ${req.params.id} Id`, 404)
    )
  }
  res.status(200).json({
    success: true,
    order,
  })
})

//Get logged in user order
exports.getAllMyOrder = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id })

  res.status(200).json({
    success: true,
    orders,
  })
})
//Get All Order --- admin
exports.getAllOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find()

  let totalAmount = 0

  orders.forEach((order) => {
    totalAmount += order.totalPrice
  })

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  })
})

//Update Order Status --- admin
exports.updateOrderStatus = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id)

  if (!order) {
    return next(
      new ErrorHandler(`Order not found with this ${req.params.id} Id`, 404)
    )
  }

  if (order.orderStatus === 'Delivered') {
    return next(new ErrorHandler('You have already delivered this order', 400))
  }

  order.orderItems.forEach(async (o) => {
    await updateStock(o.productId, o.quantity)
  })

  order.orderStatus = req.body.status

  if (req.body.status === 'Delivered') {
    order.deliveredAt = Date.now()
  }

  await order.save({ validateBeforeSave: false })
  res.status(200).json({
    success: true,
  })
})

async function updateStock(id, quantity) {
  const product = await Product.findById(id)

  product.stock -= quantity

  await product.save({ validateBeforeSave: false })
}

//Delte Order --- admin
exports.deleteOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id)

  if (!order) {
    return next(
      new ErrorHandler(`Order not found with this ${req.params.id} Id`, 404)
    )
  }
  await order.remove()
  res.status(200).json({
    success: true,
    message: `Order with ${req.params.id} is successfully Deleted!`,
  })
})
