const restrictedOrderAgg = require('./restrictedOrder.aggregate');
const transportAgg = require('./transport.aggregate');
const orderAgg = require('./order.aggregate')
const userOrdersAgg = require('./userOrders.aggregate')

module.exports = { restrictedOrderAgg, transportAgg, orderAgg, userOrdersAgg };