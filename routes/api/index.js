const router = require('express').Router();

const employeeRoutes = require('./employee');
const categoryRoutes = require('./category');
const itemRoutes = require('./item');
const restrictedOrderRoutes = require('./restrictedOrder');
const requiredDocumentRoutes = require('./requiredDocument');
const countryRoutes = require('./country');

// employee routes
router.use('/employee', employeeRoutes);

//category routes
router.use('/category', categoryRoutes)

//item routes
router.use('/item', itemRoutes)

//restricted order routes
 router.use('/restrictedOrder', restrictedOrderRoutes)

//required document routes
 router.use('/requiredDocument', requiredDocumentRoutes)

//country routes
 router.use('/country', countryRoutes)

module.exports = router;
