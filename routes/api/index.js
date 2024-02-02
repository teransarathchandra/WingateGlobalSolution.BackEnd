const router = require('express').Router();

const employeeRoutes = require('./employee');
const categoryRoutes = require('./category');
const vehicleRoutes = require('./vehicle');

// employee routes
router.use('/employee', employeeRoutes);

//category routes
router.use('/category', categoryRoutes)

//vehicle routes
router.use('/vehicle', vehicleRoutes);

module.exports = router;
