const router = require('express').Router();

const emailRoutes = require('./email.route');
const employeeRoutes = require('./employee.route');
const categoryRoutes = require('./category.route');
const vehicleRoutes = require('./vehicle.route');
const portRoutes = require('./port.route');
const bulkRoutes = require('./bulk.route');
const itemRoutes = require('./item.route');
const restrictedOrderRoutes = require('./restrictedOrder.route');
const requiredDocumentRoutes = require('./requiredDocument.route');
const countryRoutes = require('./country.route');
const routeRoutes = require('./route.route');
const userRoutes = require('./user.route');
const customerRoutes = require('./customer.route');
const contactPersonRoutes = require('./contactPerson.route');
const systemAccessRoutes = require('./systemAccess.route');
const designationRoutes = require('./designation.route');
const loanRoutes = require('./loan.route');
const driverRoutes = require('./driver.route');
const warehouseRoutes = require('./warehouse.route');
const paymentRoutes = require('./payment.route');
const quotationRoutes = require('./quotation.route');
const paymentMethodRoutes = require('./paymentMethod.route');

//email routes
router.use('/email', emailRoutes);

//employee routes
router.use('/employee', employeeRoutes);

//category routes
router.use('/category', categoryRoutes)

//user routes
router.use('/user', userRoutes);

//customer routes
router.use('/customer', customerRoutes);

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

//payment routes
router.use('/payment', paymentRoutes)

//quotation routes
router.use('/quotation', quotationRoutes)

//paymentMethod routes
router.use('/paymentMethod', paymentMethodRoutes)

module.exports = router;