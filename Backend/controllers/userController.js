const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../Middleware/catchAsyncError')
const User = require('../models/userModel')
const sendToken = require('../utils/jwtToken')
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')

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

exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    return next(new ErrorHandler('User not found', 404))
  } else {
    //Get ResetPassword token
    const resetToken = user.getResetPasswordToken()

    console.log(resetToken, 'token is here')

    await user.save({ validateBeforeSave: true })
    const resetPasswordUrl = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/password/reset/${resetToken}`

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email then, please ignore it`

    try {
      await sendEmail({
        email: user.email,
        subject: 'Ecommerce Electronic Reset password',
        message,
      })
      res.status(200).json({
        success: true,
        message: `Email is sent to ${user.email} successfully`,
      })
    } catch (error) {
      user.resetPasswordToken = undefined
      user.resetPasswordExpire = undefined
      await user.save({ validateBeforeSave: true })
      return next(new ErrorHandler(error.message, 500))
    }
  }
})

exports.resetPassword = catchAsyncError(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex')

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: {
      $gt: Date.now(),
    },
  })
  if (!user) {
    return next(
      new ErrorHandler(
        'Reset Password token is not valid or has been Expired',
        400
      )
    )
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler('Password does not match'))
  }
  user.password = req.body.password
  user.resetPasswordToken = undefined
  user.resetPasswordExpire = undefined

  await user.save()
  sendToken(user, 200, res)
})
