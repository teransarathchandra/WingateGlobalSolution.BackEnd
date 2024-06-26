const bulkSchema = require('./bulk.schema');
const categorySchema = require('./category.schema');
const commercialInvoiceSchema = require('./commercialInvoice.schema');
const contactPersonSchema = require('./contactPerson.schema');
const countrySchema = require('./country.schema');
const customerSchema = require('./customer.schema');
const designationSchema = require('./designation.schema');
const driverSchema = require('./driver.schema');
const emailSchema = require('./email.schema');
const employeeSchema = require('./employee.schema');
const itemSchema = require('./item.schema');
const loanSchema = require('./loan.schema');
const orderSchema = require('./order.schema');
const packageTypeSchema = require('./packageType.schema');
const paymentSchema = require('./payment.schema');
const paymentMethodSchema = require('./paymentMethod.schema');
const portSchema = require('./port.schema');
const quotationSchema = require('./quotation.schema');
const receiverSchema = require('./receiver.schema');
const reminderSchema = require('./reminder.schema');
const restrictedOrderSchema = require('./restrictedOrder.schema');
const routeSchema = require('./route.schema');
const salesSchema = require('./sales.schema');
const senderSchema = require('./sender.schema');
const stockSchema = require('./stock.schema');
const submittedDocumentSchema = require('./submittedDocument.schema');
const systemAccessSchema = require('./systemAccess.schema');
const userSchema = require('./user.schema');
const vehicleSchema = require('./vehicle.schema');
const wareHouseSchema = require('./warehouse.schema');
const flightSchema = require('./flight.schema');
const airlineSchema = require('./airline.schema');
const fileUploadSchema = require('./fileUpload.schema');

module.exports = {
    bulkSchema, categorySchema, commercialInvoiceSchema, contactPersonSchema, countrySchema, customerSchema, designationSchema, driverSchema, emailSchema,
    employeeSchema, itemSchema, loanSchema, orderSchema, packageTypeSchema, paymentSchema, paymentMethodSchema, portSchema, quotationSchema, receiverSchema,
    reminderSchema, restrictedOrderSchema, routeSchema, salesSchema, senderSchema, stockSchema, submittedDocumentSchema, systemAccessSchema, userSchema, vehicleSchema, wareHouseSchema, flightSchema,
    airlineSchema, fileUploadSchema
};