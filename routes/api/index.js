const router = require('express').Router();

const employeeRoutes = require('./employee');
const categoryRoutes = require('./category');

// employee routes
router.use('/employee', employeeRoutes);

//category routes
router.use('/category', categoryRoutes)

module.exports = router;
