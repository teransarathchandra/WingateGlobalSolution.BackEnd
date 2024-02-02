const router = require('express').Router();

const employeeRoutes = require('./employee');
const categoryRoutes = require('./category');
const userRoutes = require('./user')

// employee routes
router.use('/employee', employeeRoutes);

//category routes
router.use('/category', categoryRoutes)

//user routes
router.use('/user', userRoutes)

module.exports = router;
