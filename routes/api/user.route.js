const express = require('express');
const router = express.Router();

const { userController } = require('../../controllers');

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.patch('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.post('/login', userController.loginUser);
router.post('/logout', userController.logoutUser);
router.get('/verify-email/:token', userController.verifyEmail);
router.post('/auth/google', userController.googleSignIn);

module.exports = router;
