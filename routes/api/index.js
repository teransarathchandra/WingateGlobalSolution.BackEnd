const router = require('express').Router();

const employeeRoutes = require('./employee');
const categoryRoutes = require('./category');
const vehicleRoutes = require('./vehicle');
const portRoutes = require('./port');
const bulkRoutes = require('./bulk');
const itemRoutes = require('./item');
const restrictedOrderRoutes = require('./restrictedOrder');
const requiredDocumentRoutes = require('./requiredDocument');
const countryRoutes = require('./country');
const routeRoutes = require('./route');
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

//vehicle routes
router.use('/vehicle', vehicleRoutes);

//port routes
router.use('/port', portRoutes)

//bulk routes
router.use('/bulk', bulkRoutes)

//item routes
router.use('/item', itemRoutes)

//restricted order routes
 router.use('/restrictedOrder', restrictedOrderRoutes)

//required document routes
 router.use('/requiredDocument', requiredDocumentRoutes)

//country routes
 router.use('/country', countryRoutes)

//route routes
 router.use('/route', routeRoutes)

module.exports = router;

