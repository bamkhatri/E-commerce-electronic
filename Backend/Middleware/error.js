const ErrorHandler = require('../utils/errorHandler')

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.message = err.message || 'Internal Server Error'

  //Wrong mongodb id error
  if (err.name === 'CastError') {
    const message = `Resource not found.Invalid:${err.path}`
    err = new ErrorHandler(message, 400)
  }
  //Mongoose duplicate error
  if (err.code === 11000) {
    const message = `Email is Already exist`
    err = new ErrorHandler(message, 400)
  }
  //JWTerror
  if (err.code === 'JsonWebTokenError') {
    const message = `Json web token is Invalid ,try again`
    err = new ErrorHandler(message, 400)
  }

  //JWT error
  if (err.code === 'TokenExpiredError') {
    const message = `Json web token is Expired ,Try again`
    err = new ErrorHandler(message, 400)
  }
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  })
}
