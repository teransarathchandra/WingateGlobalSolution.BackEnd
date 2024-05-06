const express = require('express');
const router = express.Router();

const { userController } = require('../../controllers');
const { isAuthorized } = require('../../middlewares'); isAuthorized,

    router.get('/', isAuthorized, userController.getAllUsers);
router.get('/:id', isAuthorized, userController.getUserById);
router.post('/', userController.createUser);
router.patch('/:id', isAuthorized, userController.updateUser);
router.delete('/:id', isAuthorized, userController.deleteUser);
router.post('/login', userController.loginUser);
router.post('/logout', userController.logoutUser);
router.get('/verify-email/:token', userController.verifyEmail);
router.post('/auth/google', userController.googleSignIn);
router.get('/orders/:userId', isAuthorized, userController.getUserOrders);
router.post('/refresh_token', userController.refreshAccessToken);

module.exports = router;
