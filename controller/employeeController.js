const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

const Employee = require('../models/employee.model');
const { registerSchema, loginSchema, updateSchema } = require('../schemas/employeeSchema')
const { hashedPassword, BadRequestError } = require('../helpers');

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
            BadRequestError(error);
        }

        const { employeeId, name, address, username, email, password, contactNumber, designationId, countryId } = value;

        // Check if the employee already exists
        const existingEmployee = await Employee.findOne({ email });
        if (existingEmployee) {
            return res.status(409).json({ message: 'Employee already exists' });
        }

        // Insert the employee
        // const employee = await Employee.create({
        //     employeeId,
        //     name,
        //     address,
        //     username,
        //     email,
        //     password,
        //     contactNumber,
        //     designationId,
        //     countryId
        // });

        // Create the employee
        const employee = new Employee({
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

        // Generate access and refresh tokens
        const { accessToken, refreshToken } = employee.signToken();

        // Save the refreshToken with the employee
        employee.refreshToken = refreshToken;
        await employee.save();
        
        if (!employee) {
            return res.status(400).json({ message: 'Employee Cannot Create' });
        }

        // sending response exclude the password and refresh token
        const employeeData = employee.toObject();
        delete employeeData.password;
        delete employeeData.refreshToken;

        res.status(201).json({ accessToken, data: employeeData, message: 'Employee Created Successfully' });

    } catch (err) {
        console.error(err);
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
            BadRequestError(error);
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
            BadRequestError(error);
        }

        const { email, password } = value;
        const employee = await Employee.findOne({ email });
        if (!employee) {
            return res.status(400).json({ status: 400, message: 'Invalid Email Address, Please try again' });
        }

        if (!employee.comparePassword(password)) {
            return res.status(400).json({ status: 400, message: 'Invalid Password, Please try again' });
        }

        const { accessToken, refreshToken } = employee.signToken();
        await Employee.findByIdAndUpdate(employee._id, { $set: { refreshToken: refreshToken } }, { new: true });

        res.json({
            status: 200,
            accessToken,
            refreshToken,
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

const logoutEmployee = async (req, res) => {
    const { id } = req.body; // Assuming you're sending the employeeId to identify the user

    try {
        // Invalidate the refresh token by setting it to null or removing it
        await Employee.findByIdAndUpdate(id, { $unset: { refreshToken: "" } });

        res.status(200).json({ message: "Logout successful." });
    } catch (error) {
        res.status(500).json({ message: "An error occurred during logout." });
    }
}

const refreshAccessToken = async (req, res) => {
    const { refreshToken } = req.body; // Assuming the refresh token is sent in the body
    if (!refreshToken) {
        return res.status(401).json({ message: "Refresh token is required" });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const employee = await Employee.findById(decoded.id);

        if (!employee || employee.refreshToken !== refreshToken) {
            return res.status(401).json({ message: "Invalid or expired refresh token" });
        }

        // Generate a new access cancelToken: new CancelToken(()=>{})
        const newAccessToken = employee.signToken().accessToken;
        const newRefreshToken = employee.signToken().refreshToken;

        await Employee.findByIdAndUpdate(employee._id, { $set: { refreshToken: refreshToken } }, { new: true });

        res.json({
            newAccessToken: newAccessToken,
            newRefreshToken: newRefreshToken,
            // Optionally return a new refresh token
        });
    } catch (error) {
        return res.status(403).json({ message: "Invalid refresh token" });
    }
};

module.exports = { getAllEmployees, getEmployeeById, createEmployee, updateEmployee, deleteEmployee, loginEmployee, logoutEmployee, refreshAccessToken };