const restrictedOrderAgg = require('./restrictedOrder.aggregate');
const transportAgg = require('./transport.aggregate');
const orderAgg = require('./order.aggregate')
const userOrdersAgg = require('./userOrders.aggregate')
const crmAgg = require('./crm.aggregate');
const warehouseAgg = require ( './warehouse.aggregate');

module.exports = { restrictedOrderAgg, transportAgg, orderAgg, userOrdersAgg, crmAgg, warehouseAgg };