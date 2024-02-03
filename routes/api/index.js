const router = require('express').Router();

const employeeRoutes = require('./employee');
const categoryRoutes = require('./category');
const portRoutes = require('./port');
const bulkRoutes = require('./bulk');

// employee routes
router.use('/employee', employeeRoutes);

//category routes
router.use('/category', categoryRoutes)

//port routes
router.use('/port', portRoutes)

//bulk routes
router.use('/bulk', bulkRoutes)

module.exports = router;
