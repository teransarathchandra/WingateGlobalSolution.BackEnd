const router = require('express').Router();

const employeeRoutes = require('./employee');
const categoryRoutes = require('./category');
const userRoutes = require('./user');
 const customerRoutes = require('./customer');


// employee routes
router.use('/employee', employeeRoutes);

//category routes
router.use('/category', categoryRoutes)

//user routes
router.use('/user', userRoutes);

//customer routes
 router.use('/customer', customerRoutes);



module.exports = router;
