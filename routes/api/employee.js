const express = require('express');
const router = express.Router();

const { getAllEmployees, getEmployeeById, createEmployee, updateEmployee, deleteEmployee, loginEmployee, logoutEmployee, refreshAccessToken } = require('../../controller/employeeController');

const { isAuthorized } = require('../../middlewares');

router.get('/', isAuthorized, getAllEmployees);
router.get('/:id', isAuthorized, getEmployeeById);
router.post('/', createEmployee);
router.put('/:id', isAuthorized, updateEmployee);
router.delete('/:id', isAuthorized, deleteEmployee);
router.post('/login', loginEmployee);
router.post('/logout', logoutEmployee);
router.post('/refresh_token', refreshAccessToken);

module.exports = router;