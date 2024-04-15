const bulkController = require('./bulk.controller');
const categoryController = require('./category.controller');
const commercialInvoiceController = require('./commercialInvoice.controller');
const contactPersonController = require('./contactPerson.controller');
const countryController = require('./country.controller');
const customerController = require('./customer.controller');
const designationController = require('./designation.controller');
const driverController = require('./driver.controller');
const emailController = require('./email.controller');
const employeeController = require('./employee.controller');
const itemController = require('./item.controller');
const loanController = require('./loan.controller');
const orderController = require('./order.controller');
const packageTypeController = require('./packageType.controller');
const paymentController = require('./payment.controller');
const paymentMethodController = require('./paymentMethod.controller');
const portController = require('./port.controller');
const quotationController = require('./quotation.controller');
const receiverController = require('./receiver.controller');
const reminderController = require('./reminder.controller');
const restrictedOrderController = require('./restrictedOrder.controller');
const routeController = require('./route.controller');
const salesController = require('./sales.controller');
const stockController = require('./stock.controller');
const submittedDocumentController = require('./submittedDocument.controller');
const systemAccessController = require('./systemAccess.controller');
const userController = require('./user.controller');
const vehicleController = require('./vehicle.controller');
const wareHouseController = require('./wareHouse.controller');
const flightController = require('./flight.controller');
const airlineController = require('./airline.controller');
const fileUploadController = require('./fileUpload.controller');
const pdfController = require('./pdf.controller');

module.exports = {
    bulkController, categoryController, commercialInvoiceController,  contactPersonController, countryController, customerController, designationController,
    driverController, emailController, employeeController, itemController, loanController, orderController, packageTypeController, paymentController, 
    paymentMethodController, portController, quotationController, receiverController, reminderController, restrictedOrderController, 
    routeController, salesController, stockController, submittedDocumentController, systemAccessController, userController, vehicleController, 
    wareHouseController, flightController, airlineController, fileUploadController, pdfController
};