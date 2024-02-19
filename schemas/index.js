const bulkSchema = require('./bulk.schema');
const categorySchema = require('./category.schema');
const contactPersonSchema = require('./contactPerson.schema');
const countrySchema = require('./country.schema');
const customerSchema = require('./customer.schema');
const designationSchema = require('./designation.schema');
const driverSchema = require('./driver.schema');
const emailSchema = require('./email.schema');
const employeeSchema = require('./employee.schema');
const itemSchema = require('./item.schema');
const loanSchema = require('./loan.schema');
const paymentSchema = require('./payment.schema');
const paymentMethodSchema = require('./paymentMethod.schema');
const portSchema = require('./port.schema');
const quotationSchema = require('./quotation.schema');
const requiredDocumentSchema = require('./requiredDocument.schema');
const restrictedOrderSchema = require('./restrictedOrder.schema');
const routeSchema = require('./route.schema');
const stockSchema = require('./stock.schema');
const systemAccessSchema = require('./systemAccess.schema');
const userSchema = require('./user.schema');
const vehicleSchema = require('./vehicle.schema');
const wareHouseSchema = require('./warehouse.schema');

module.exports = {
    bulkSchema, categorySchema, contactPersonSchema, countrySchema, customerSchema, designationSchema, driverSchema, emailSchema,
    employeeSchema, itemSchema, loanSchema, paymentSchema, paymentMethodSchema, portSchema, quotationSchema, requiredDocumentSchema, 
    restrictedOrderSchema, routeSchema, stockSchema, systemAccessSchema, userSchema, vehicleSchema, wareHouseSchema
};