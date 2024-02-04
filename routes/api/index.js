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
const userRoutes = require('./user');
const customerRoutes = require('./customer');
const contactPersonRoutes = require('./contactPerson');
const systemAccessRoutes = require('./systemAccess');
const designationRoutes = require('./designation');
const loanRoutes = require('./loan');

// employee routes
router.use('/employee', employeeRoutes);

//category routes
router.use('/category', categoryRoutes)

//user routes
router.use('/user', userRoutes);

//customer routes
 router.use('/customer', customerRoutes);

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

 //contactPerson routes
 router.use('/contactPerson', contactPersonRoutes)

//route routes
 router.use('/route', routeRoutes)

 //system access routes
 router.use('/systemAccess', systemAccessRoutes)

 //designation routes
 router.use('/designation', designationRoutes)

//loans routes
 router.use('/loan', loanRoutes)

module.exports = router;

