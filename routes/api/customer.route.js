const express = require('express');
const router = express.Router();

const { customerController } = require('../../controllers');
const { isAuthorized } = require('../../middlewares');isAuthorized, 

router.get('/', isAuthorized, customerController.getAllCustomers);
router.get('/:id', isAuthorized, customerController.getCustomerById);
router.post('/', isAuthorized, customerController.createCustomer);
router.patch('/:id', isAuthorized, customerController.updateCustomer);
router.delete('/:id', isAuthorized, customerController.deleteCustomer);

module.exports = router;
