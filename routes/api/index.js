const router = require('express').Router();

const bulkRoutes = require('./bulk.route');
const categoryRoutes = require('./category.route');
const commercialInvoiceRoutes = require('./commercialInvoice.route');
const contactPersonRoutes = require('./contactPerson.route');
const countryRoutes = require('./country.route');
const customerRoutes = require('./customer.route');
const designationRoutes = require('./designation.route');
const driverRoutes = require('./driver.route');
const emailRoutes = require('./email.route');
const employeeRoutes = require('./employee.route');
const itemRoutes = require('./item.route');
const loanRoutes = require('./loan.route');
const orderRoutes = require('./order.route');
const packageTypeRoutes = require('./packageType.route');
const paymentMethodRoutes = require('./paymentMethod.route');
const paymentRoutes = require('./payment.route');
const portRoutes = require('./port.route');
const quotationRoutes = require('./quotation.route');
const receiverRoutes = require('./receiver.route');
const reminderRoutes = require('./reminder.route');
const restrictedOrderRoutes = require('./restrictedOrder.route');
const routeRoutes = require('./route.route');
const salesRoutes = require('./sales.route');
const stockRoutes = require('./stock.route');
const submittedDocumentRoutes = require('./submittedDocument.route');
const systemAccessRoutes = require('./systemAccess.route');
const userRoutes = require('./user.route');
const vehicleRoutes = require('./vehicle.route');
const warehouseRoutes = require('./warehouse.route');

//bulk routes
router.use('/bulk', bulkRoutes);

//category routes
router.use('/category', categoryRoutes);

//commercialInvoice routes
router.use('/commercialInvoice', commercialInvoiceRoutes);

//contactPerson routes
router.use('/contactPerson', contactPersonRoutes);

//country routes
router.use('/country', countryRoutes);

//customer routes
router.use('/customer', customerRoutes);

//designation routes
router.use('/designation', designationRoutes);

//driver routes
router.use('/driver', driverRoutes);

//email routes
router.use('/email', emailRoutes);

//employee routes
router.use('/employee', employeeRoutes);

//item routes
router.use('/item', itemRoutes);

//loan routes
router.use('/loan', loanRoutes);

//order routes
router.use('/order', orderRoutes);

//packageType routes
router.use('/packageType', packageTypeRoutes);

//payment routes
router.use('/payment', paymentRoutes);

//paymentMethod routes
router.use('/paymentMethod', paymentMethodRoutes);

//port routes
router.use('/port', portRoutes);

//quotation routes
router.use('/quotation', quotationRoutes);

//receiver routes
router.use('/receiver', receiverRoutes);

//reminder routes
router.use('/reminder', reminderRoutes);

//required document routes
router.use('/submittedDocument', submittedDocumentRoutes)

//restrictedOrder routes
router.use('/restrictedOrderType', restrictedOrderRoutes);

//route routes
router.use('/route', routeRoutes);

//sales routes
router.use('/sales', salesRoutes);

//stock routes
router.use('/stock', stockRoutes);

//systemAccess routes
router.use('/systemAccess', systemAccessRoutes);

//user routes
router.use('/user', userRoutes);

//vehicle routes
router.use('/vehicle', vehicleRoutes);

//warehouse routes
router.use('/warehouse', warehouseRoutes);


module.exports = router;