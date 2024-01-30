const mongoose = require('mongoose');

const Employee = require('../models/employeeSchema');
const EmployeeJoiSchema = require('../schemas/employeeSchema')

const getAllEmployees = async (req, res) => {

    try {
        const employee = await Employee.find();

        if (!employee) {
            return res.status(404).json({ status: 404, message: "Employee not found" });
        }

        res.status(200).json({ status: 200, data: employee, message: "Employees Found" });

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
            return res.status(404).json({ status: 404, error: "Invalid employee id" })
        }

        const employee = await Employee.findById(id);

        if (!employee) {
            return res.status(404).json({ status: 404, message: "Employee not found" });
        }

        res.status(200).json({ status: 200, data: employee, message: "Employee Found" });
    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
};

const createEmployee = async (req, res) => {

    try {
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
            return res.status(404).json({ status: 404, error: "Invalid employee id" });
        }

        const { value, error } = EmployeeJoiSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ status: 400, error: error });
        }

        const updatedEmployee = await Employee.findByIdAndUpdate(id, value, { new: true });
        if (!updatedEmployee) {
            return res.status(404).json({ status: 404, message: "Employee not found" });
        }

        res.status(200).json({ status: 200, data: updatedEmployee, message: "Employee Updated Successfully" });

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
            return res.status(404).json({ status: 404, error: "Invalid employee id" });
        }

        const deletedEmployee = await Employee.findByIdAndDelete(id);
        if (!deletedEmployee) {
            return res.status(404).json({ status: 404, message: "Employee not found" });
        }

        res.status(200).json({ status: 200, message: "Employee Deleted Successfully" });

    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
};

module.exports = { getAllEmployees, getEmployeeById, createEmployee, updateEmployee, deleteEmployee };