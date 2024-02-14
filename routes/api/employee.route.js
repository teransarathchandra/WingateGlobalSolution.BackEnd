const express = require('express');
const router = express.Router();

const { employeeController } = require('../../controllers');

const { isAuthorized } = require('../../middlewares');

router.get('/', isAuthorized, employeeController.getAllEmployees);
router.get('/:id', isAuthorized, employeeController.getEmployeeById);
router.post('/', employeeController.createEmployee);
router.put('/:id', isAuthorized, employeeController.updateEmployee);
router.delete('/:id', isAuthorized, employeeController.deleteEmployee);
router.post('/login', employeeController.loginEmployee);
router.post('/logout', isAuthorized, employeeController.logoutEmployee);
router.post('/refresh_token', employeeController.refreshAccessToken);

module.exports = router;