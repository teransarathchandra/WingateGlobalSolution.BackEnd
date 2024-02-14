const bulkController = require('./bulk.controller');
const categoryController = require('./category.controller');
const contactPersonController = require('./contactPerson.controller');
const countryController = require('./country.controller');
const customerController = require('./customer.controller');
const designationController = require('./designation.controller');
const driverController = require('./driver.controller');
const emailController = require('./email.controller');
const employeeController = require('./employee.controller');
const itemController = require('./item.controller');
const loanController = require('./loan.controller');
const paymentController = require('./payment.controller');
const paymentMethodController = require('./paymentMethod.controller');
const portController = require('./port.controller');
const quotationController = require('./quotation.controller');
const requiredDocumentController = require('./requiredDocument.controller');
const restrictedOrderController = require('./restrictedOrder.controller');
const routeController = require('./route.controller');
const systemAccessController = require('./systemAccess.controller');
const userController = require('./user.controller');
const vehicleController = require('./vehicle.controller');
const wareHouseController = require('./wareHouse.controller');

module.exports = {
    bulkController, categoryController, contactPersonController, countryController, customerController, designationController,
    driverController, emailController, employeeController, itemController, loanController, paymentController, paymentMethodController, portController, quotationController,
    requiredDocumentController, restrictedOrderController, routeController, systemAccessController, userController, vehicleController, wareHouseController
};