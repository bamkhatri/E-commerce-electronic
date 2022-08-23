const express = require('express')
const {
  processPayment,
  sendStripeApiKey,
} = require('../controllers/paymentController')
const router = express.Router()
const { isAuthenticatedUser } = require('../Middleware/auth')

router.post('/process/payment', isAuthenticatedUser, processPayment)
router.get('/stripeapikey', isAuthenticatedUser, sendStripeApiKey)
module.exports = router
