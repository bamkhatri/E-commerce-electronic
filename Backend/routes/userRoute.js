const express = require('express')
const userController = require('../controllers/userController')
const { isAuthenticatedUser, authorizeRoles } = require('../Middleware/auth')
const router = express.Router()

router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)
router.post('/password/forgot', userController.forgotPassword)
router.put('/password/reset/:token', userController.resetPassword)
router.get('/me', isAuthenticatedUser, userController.getUserDetails)
router.get('/logout', userController.logoutUser)
router.put('/me/password', isAuthenticatedUser, userController.updatePassword)
router.put('/me/update', isAuthenticatedUser, userController.updateProfile)
router.put(
  '/me/update/profile',
  isAuthenticatedUser,
  userController.updateProfileImage
)
router.get(
  '/admin/user',
  isAuthenticatedUser,
  authorizeRoles('admin'),
  userController.getAllUser
)
router.get(
  '/admin/user/:id',
  isAuthenticatedUser,
  authorizeRoles('admin'),
  userController.getUser
)
router.put(
  '/admin/update/:id',
  isAuthenticatedUser,
  authorizeRoles('admin'),
  userController.updateUserRole
)
router.delete(
  '/admin/delete/:id',
  isAuthenticatedUser,
  authorizeRoles('admin'),
  userController.deleteUser
)
module.exports = router
