const restrictedOrderAgg = require('./restrictedOrder.aggregate');
const transportAgg = require('./transport.aggregate');
const orderAgg = require('./order.aggregate');
const financeAgg = require('./finance.aggregate')

module.exports = { restrictedOrderAgg, transportAgg, orderAgg, financeAgg };