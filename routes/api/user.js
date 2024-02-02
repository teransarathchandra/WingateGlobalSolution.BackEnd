const express = require('express');
const router = express.Router();

const {getAllUser, getUserById, createUser, updateUser, deleteUser} = require('../../controller/userController')

router.get('/', getAllUser);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;