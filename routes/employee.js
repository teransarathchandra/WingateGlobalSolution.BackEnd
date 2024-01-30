const express = require('express');
const router = express.Router();

const Employee = require('../models/employee');

router.post('/', async (req, res) => {
    const { employeeId, name, contactNumber, password, accessLevelId, street, city, state } = req.body;

    const employee = await Employee.create({
        employeeId,
        name,
        contactNumber,
        password,
        accessLevelId,
        street,
        city,
        state
    });

    if (!employee) {
        return res.status(400).json({ message: 'Employee Cannot Create' });
    }

    res.status(201).json({ data: employee, message: 'Employee Created Successfully' });
})

module.exports = router;