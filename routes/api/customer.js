const express = require('express');
const router = express.Router();

const { getAllCustomers, getCustomerById, createCustomer, updateCustomer, deleteCustomer } = require('../../controller/customerController');

router.get('/', getAllCustomers);
router.get('/:id', getCustomerById);
router.post('/', createCustomer);
router.put('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);

module.exports = router;
