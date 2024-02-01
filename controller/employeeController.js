const mongoose = require('mongoose');

const Employee = require('../models/employee.model');
const { registerSchema, loginSchema, updateSchema } = require('../schemas/employeeSchema')
const { hashedPassword } = require('../helpers');

const getAllEmployees = async (req, res) => {

    try {
        const employee = await Employee.find();

        if (!employee) {
            return res.status(404).json({ status: 404, message: 'Employee not found' });
        }

        res.status(200).json({ status: 200, data: employee, message: 'Employees Found' });

    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
};

const getEmployeeById = async (req, res) => {

    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, error: 'Invalid employee id' })
        }

        const employee = await Employee.findById(id);

        if (!employee) {
            return res.status(404).json({ status: 404, message: 'Employee not found' });
        }

        res.status(200).json({ status: 200, data: employee, message: 'Employee Found' });
    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
};

const createEmployee = async (req, res) => {

    try {
        const { value, error } = registerSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ status: 400, error: error });
        }

        const { employeeId, name, address, username, email, password, contactNumber, designationId, countryId } = value;

        const employee = await Employee.create({
            employeeId,
            name,
            address,
            username,
            email,
            password,
            contactNumber,
            designationId,
            countryId
        });

        if (!employee) {
            return res.status(400).json({ message: 'Employee Cannot Create' });
        }

        res.status(201).json({ data: employee, message: 'Employee Created Successfully' });

    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
};

const updateEmployee = async (req, res) => {

    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, error: 'Invalid employee id' });
        }

        const { value, error } = updateSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ status: 400, error: error });
        }

        if (value.password) {
            value.password = await hashedPassword(value.password);
        }

        const updatedEmployee = await Employee.findByIdAndUpdate(id, value, { new: true });
        if (!updatedEmployee) {
            return res.status(404).json({ status: 404, message: 'Employee not found' });
        }

        res.status(200).json({ status: 200, data: updatedEmployee, message: 'Employee Updated Successfully' });

    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
};

const deleteEmployee = async (req, res) => {

    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, error: 'Invalid employee id' });
        }

        const deletedEmployee = await Employee.findByIdAndDelete(id);
        if (!deletedEmployee) {
            return res.status(404).json({ status: 404, message: 'Employee not found' });
        }

        res.status(200).json({ status: 200, message: 'Employee Deleted Successfully' });

    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
};

const loginEmployee = async (req, res) => {
    try {

        const { value, error } = loginSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ status: 400, error: error });
        }

        const { email, password } = value;
        const employee = await Employee.findOne({ email });
        if (!employee) {
            return res.status(400).json({ status: 400, message: 'Invalid Email Address, Please try again' });
        }

        if (!employee.comparePassword(password)) {
            return res.status(400).json({ status: 400, message: 'Invalid Password, Please try again' });
        }

        res.json({
            status: 200,
            employee: {
                name: employee.name,
                email: employee.email,
                contactNumber: employee.contactNumber
            },
            message: 'Employee logged in successfully'
        });

    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }

};

module.exports = { getAllEmployees, getEmployeeById, createEmployee, updateEmployee, deleteEmployee, loginEmployee };