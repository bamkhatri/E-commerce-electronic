const Product = require('../models/productModel')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../Middleware/catchAsyncError')
const ApiFeatures = require('../utils/apiFeatures')

//Create Product --Admin
exports.createProduct = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id
  const product = await Product.create(req.body)
  return res.status(201).json({
    success: true,
    product,
  })
})
//get all products
exports.getAllProduct = catchAsyncError(async (req, res) => {
  const productCount = await Product.countDocuments()
  const resultPerPage = 5
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage)
  const products = await apiFeature.query
  return res.status(200).json({
    success: true,
    products,
    productCount,
  })
})

//Get product details
exports.getProductDetails = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id)
  if (!product) {
    return next(new ErrorHandler('Product not Found', 404))
  }

  res.status(200).json({
    success: true,
    product,
  })
})

//Update product -admin

exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id)
  if (!product) {
    return next(new ErrorHandler('Product not Found', 404))
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })

  res.status(200).json({
    success: true,
    product,
  })
})

//Delete product  -admin
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id)
  if (!product) {
    return next(new ErrorHandler('Product not Found', 404))
  }

  await product.remove()
  res.status(200).json({
    success: true,
    message: 'Product delete successfully',
  })
})
