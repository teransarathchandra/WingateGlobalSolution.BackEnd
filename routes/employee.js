const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Employee = require('../models/employeeSchema');
const EmployeeJoiSchema = require('../schemas/employeeSchema')

router.get('/', async (req, res) => {     

    const employee = await Employee.find();

    if (!employee) {
        return res.status(404).json({ status: 404, message: "Employee not found" });
    }

    res.status(200).json({ status: 200, data: employee, message: "Employees Found"});

})

router.get('/:id', async (req, res) => {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ status: 404, error: "Invalid employee id"})
    }

    const employee = await Employee.findById(id);

    if (!employee) {
        return res.status(404).json({ status: 404, message: "Employee not found" });
    }

    res.status(200).json({ status: 200, data: employee, message: "Employee Found"});

})

router.post('/', async (req, res) => {

    const { value, error } = EmployeeJoiSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ status: 400, error: error });
    }

    const { employeeId, name, address, password, contactNumber, designationId, countryId } = value;

    const employee = await Employee.create({
        employeeId,
        name,
        address,
        password,
        contactNumber,
        designationId,
        countryId
    });

    if (!employee) {
        return res.status(400).json({ message: 'Employee Cannot Create' });
    }

    res.status(201).json({ data: employee, message: 'Employee Created Successfully' });
})

module.exports = router;