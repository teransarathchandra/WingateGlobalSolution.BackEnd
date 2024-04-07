const express = require('express');
const router = express.Router();

const { categoryController } = require('../../controllers');

router.get('/', categoryController.getAllCategory);
router.get('/:id', categoryController.getCategoryById);
router.post('/', categoryController.createCategory);
router.patch('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;