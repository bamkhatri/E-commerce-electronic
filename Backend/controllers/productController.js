const Product = require('../models/productModel')

//Create Product --Admin
exports.createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body)
    return res.status(201).json({
      success: true,
      product,
    })
  } catch (error) {
    return res.status(500).json({
      error: 'Somethings wents wrong!',
    })
  }
}
//get all products
exports.getAllProduct = async (req, res) => {
  try {
    const products = await Product.find()
    return res.status(200).json({
      success: true,
      products,
    })
  } catch (error) {
    return res.status(500).json({
      error: 'Somethings wents wrong!',
    })
  }
}

//Get product details
exports.getProductDetails = async (req, res) => {
  const product = await Product.findById(req.params.id)

  try {
    if (!product) {
      return res.statusL(500).json({
        success: false,
        message: 'Product not found',
      })
    }
    res.status(200).json({
      success: true,
      product,
    })
  } catch (error) {
    return res.status(500).json({
      error: 'Somethings wents wrong!',
    })
  }
}

//Update product -admin

exports.updateProduct = async (req, res) => {
  let product = await Product.findById(req.params.id)
  if (!product) {
    return res.status(500).json({
      success: false,
      message: 'Product not found',
    })
  }
  try {
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    })

    res.status(200).json({
      success: true,
      product,
    })
  } catch (error) {
    return res.status(500).json({
      error: 'Somethings wents wrong!',
    })
  }
}

//Delete product  -admin
exports.deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (!product) {
    return res.status(500).json({
      success: false,
      message: 'Product  not found',
    })
  }
  try {
    await product.remove()
    res.status(200).json({
      success: true,
      message: 'Product delete successfully',
    })
  } catch (error) {
    return res.status(500).json({
      error: 'Somethings wents wrong!',
    })
  }
}
