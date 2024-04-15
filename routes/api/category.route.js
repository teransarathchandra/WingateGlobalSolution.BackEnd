const express = require('express');
const router = express.Router();

const { categoryController } = require('../../controllers');
const { isAuthorized } = require('../../middlewares');

router.get('/', isAuthorized, categoryController.getAllCategory);
router.get('/:id', isAuthorized, categoryController.getCategoryById);
router.post('/', isAuthorized, categoryController.createCategory);
router.patch('/:id', isAuthorized, categoryController.updateCategory);
router.delete('/:id', isAuthorized, categoryController.deleteCategory);

module.exports = router;