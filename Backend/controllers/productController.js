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
exports.getAllProduct = catchAsyncError(async (req, res, next) => {
  const resultPerPage = 8
  const productsCount = await Product.countDocuments()

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()

  let products = await apiFeature.query

  let filteredProductsCount = products.length

  apiFeature.pagination(resultPerPage)

  products = await apiFeature.query.clone()

  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
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

// Create New Review or Update the review
exports.createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  }

  const product = await Product.findById(productId)

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  )

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment)
    })
  } else {
    product.reviews.push(review)
    product.numOfReviews = product.reviews.length
  }

  let avg = 0

  product.reviews.forEach((rev) => {
    avg += rev.rating
  })

  product.ratings = avg / product.reviews.length

  await product.save({ validateBeforeSave: false })

  res.status(200).json({
    success: true,
  })
})

//get all Reviews
exports.getAllProductReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id)
  if (!product) {
    return next(new ErrorHandler('Product Not Found', 404))
  }
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  })
})
//Delete all reviews

exports.deleteReview = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId)
  if (!product) {
    return next(new ErrorHandler('Product Not Found', 404))
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  )
  let avg = 0

  reviews.forEach((rev) => {
    avg += rev.rating
  })

  ratings = avg / reviews.length

  const numOfReviews = reviews.length
  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  )
  res.status(200).json({
    success: true,
    message: 'Review deleted Successfully',
  })
})
