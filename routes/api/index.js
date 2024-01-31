const router = require('express').Router();

const employeeRoutes = require('./employee');
const vehicleRoutes = require('./vehicle');

// employee routes
router.use('/employee', employeeRoutes);

//vehicle routes
router.use('/vehicle', vehicleRoutes);

module.exports = router;
