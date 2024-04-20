const restrictedOrderAgg = require('./restrictedOrder.aggregate');
const transportAgg = require('./transport.aggregate');
const orderAgg = require('./order.aggregate');
const crmAgg = require('./crm.aggregate');
const warehouseAgg = require ( './warehouse.aggregate');

module.exports = { restrictedOrderAgg, transportAgg, orderAgg, crmAgg, warehouseAgg };