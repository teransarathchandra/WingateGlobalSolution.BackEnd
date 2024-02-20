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
const requiredDocumentController = require('./requiredDocument.controller');
const restrictedOrderController = require('./restrictedOrder.controller');
const routeController = require('./route.controller');
const salesController = require('./sales.controller');
const stockController = require('./stock.controller');
const systemAccessController = require('./systemAccess.controller');
const userController = require('./user.controller');
const vehicleController = require('./vehicle.controller');
const wareHouseController = require('./wareHouse.controller');

module.exports = {
    bulkController, categoryController, commercialInvoiceController,  contactPersonController, countryController, customerController, designationController,
    driverController, emailController, employeeController, itemController, loanController, orderController, packageTypeController, paymentController, 
    paymentMethodController, portController, quotationController, receiverController, reminderController, requiredDocumentController, restrictedOrderController, 
    routeController, salesController, stockController, systemAccessController, userController, vehicleController, wareHouseController
};