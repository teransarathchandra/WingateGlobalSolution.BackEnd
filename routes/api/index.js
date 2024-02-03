const router = require('express').Router();

const employeeRoutes = require('./employee');
const categoryRoutes = require('./category');
const driverRoutes = require('./driver');
const warehouseRoutes = require('./warehouse');

// employee routes
router.use('/employee', employeeRoutes);

//category routes
router.use('/category', categoryRoutes)

//driver routes
router.use('/driver', driverRoutes)

//warehouse routes
router.use('/warehouse', warehouseRoutes)

module.exports = router;
