const express = require('express')
const userController = require('../controllers/userController')
const { isAuthenticatedUser } = require('../Middleware/auth')
const router = express.Router()

router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)
router.post('/password/forgot', userController.forgotPassword)
router.put('/password/reset/:token', userController.resetPassword)
router.get('/logout', userController.logoutUser)
module.exports = router
