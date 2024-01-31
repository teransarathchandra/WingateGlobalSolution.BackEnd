const router = require('express').Router();

const employeeRoutes = require('./employee');

// employee routes
router.use('/employee', employeeRoutes);

module.exports = router;
