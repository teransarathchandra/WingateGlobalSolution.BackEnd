const router = require('express').Router();

const employeeRoutes = require('./employee');
const categoryRoutes = require('./category');
const itemRoutes = require('./item');

// employee routes
router.use('/employee', employeeRoutes);

//category routes
router.use('/category', categoryRoutes)

//item routes
router.use('/item', itemRoutes)

module.exports = router;
