const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../Middleware/catchAsyncError')
const User = require('../models/userModel')
const sendToken = require('../utils/jwtToken')

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      publicId: 'this is sample id',
      url: 'profile pic image',
    },
  })
  sendToken(user, 201, res)
})

exports.loginUser = catchAsyncError(async (req, res, nexk) => {
  const { email, password } = req.body

  if (!email || !password) {
    return next(new ErrorHandler('Please enter Email & Password', 400))
  }
  const user = await User.findOne({ email }).select('+password')
  if (!user) {
    return new ErrorHandler('Invalid Email or Password', 401)
  }
  const isPasswordMatch = user.comparePassword(password)
  if (!isPasswordMatch) {
    return new ErrorHandler('Invalid Email or Password')
  }
  sendToken(user, 200, res)
})

exports.logoutUser = catchAsyncError(async (req, res, nexk) => {
  console.log('Hello')

  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  })
  res.status(200).json({
    success: true,
    message: 'Logged Out',
  })
})
