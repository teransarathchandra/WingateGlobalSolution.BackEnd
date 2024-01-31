const express = require('express');
const router = express.Router();

const { getAllCategory, getCategoryById, createCategory, updateCategory, deleteCategory } = require('../../controller/categoryController');

router.get('/', getAllCategory);
router.get('/:id', getCategoryById);
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;