const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const { Employee, Country } = require("../models");
const { employeeSchema } = require("../schemas");
const { hashedPassword, BadRequestError, sendEmail } = require("../helpers");
const { employeeAccessAgg } = require('../aggregates');
const { emailTemplates } = require("../constants");
const { generateVerificationToken } = require("../utils");

const getAllEmployees = async (req, res) => {
  try {
    let employee
    const { type } = req.query;

    if (type == 'withAccess') {
      employee = await Employee.aggregate(employeeAccessAgg.aggType);
      employee.forEach((emp) => {
        emp.accessDescription = emp.accessDescription || "No Access";
      });
    } else {
      employee = await Employee.find();
    }



    if (!employee) {
      return res.status(404).json({ status: 404, message: "Employees not found" });
    }

    res.status(200).json({ status: 200, data: employee, message: "Employees found successfully" });

  } catch (err) {
    res.status(400).json({
      error: err.message,
      message: "Your request cannot be processed. Please try again",
    });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ status: 404, message: "Invalid employee id" });
    }

    const employee = await Employee.findById(id);

    if (!employee) {
      return res
        .status(404)
        .json({ status: 404, message: "Employee not found" });
    }

    res.status(200).json({
      status: 200,
      data: {
        employeeId: employee.employeeId,
        firstName: employee.name.firstName,
        lastName: employee.name.lastName,
        email: employee.email,
        contactNumber: employee.contactNumber,
        address: employee.address,
        focus: employee.focus,
      },
      message: "Employee found successfully",
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
      message: "Your request cannot be processed. Please try again",
    });
  }
};

const createEmployee = async (req, res) => {
  try {
    const { value, error } = employeeSchema.registerSchema.validate(req.body);

    if (error) {
      BadRequestError(error);
    }

    const { name, email, contactNumber, address, password, focus, designationId } = value;

    // Check if the user already exists
    const existingEmp = await Employee.findOne({ email });
    if (existingEmp) {
      return res.status(409).json({ message: "Employee already exists" });
    }

    const employee = new Employee({
      name,
      email,
      contactNumber,
      address,
      password,
      designationId,
      focus,
    });

    if (!employee) {
      return res.status(400).json({ message: "Employee cannot create" });
    }

    // Generate verification token
    const verificationToken = generateVerificationToken();
    employee.verificationToken = verificationToken;

    // Generate access and refresh tokens
    const { refreshToken } = employee.signToken();

    // Save the refreshToken with the user
    employee.refreshToken = refreshToken;
    await employee.save();


    const userData = {
      userId: employee.employeeId,
      name: employee.name,
      email: employee.email,
      contactNumber: employee.contactNumber,
      address: employee.address,
      emailVerified: employee.emailVerified,
    };

    res
      .status(201)
      .json({ data: userData, message: "Employee created successfully" });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      error: err.message,
      message: "Your request cannot be processed. Please try again",
    });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ status: 404, message: "Invalid employee id" });
    }

    const { value, error } = employeeSchema.updateSchema.validate(req.body);
    if (error) {
      BadRequestError(error);
    }

    if (value.password) {
      value.password = await hashedPassword(value.password);
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(id, value, {
      new: true,
    });
    
    if (!updatedEmployee) {
      return res
        .status(404)
        .json({ status: 404, message: "Employee not found" });
    }

    res.status(200).json({
      status: 200,
      data: updatedEmployee,
      message: "Employee updated successfully",
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
      message: "Your request cannot be processed. Please try again",
    });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ status: 404, message: "Invalid employee id" });
    }

    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return res
        .status(404)
        .json({ status: 404, message: "Employee not found" });
    }

    res
      .status(200)
      .json({ status: 200, message: "Employee deleted successfully" });
  } catch (err) {
    res.status(400).json({
      error: err.message,
      message: "Your request cannot be processed. Please try again",
    });
  }
};

const loginEmployee = async (req, res) => {
  try {
    console.log(req.body);
    const { value, error } = employeeSchema.loginSchema.validate(req.body);
    if (error) {
      BadRequestError(error);
    }

    const { email, password } = value;
    const employee = await Employee.findOne({ email });

    if (!employee) {
      return res.status(400).json({
        status: 400,
        message: "Invalid email address, Please try again",
      });
    }

    if (!employee.comparePassword(password)) {
      return res
        .status(400)
        .json({ status: 400, message: "Invalid password, Please try again" });
    }

    const { accessToken, refreshToken } = employee.signToken();
    await Employee.findByIdAndUpdate(
      employee._id,
      { $set: { refreshToken: refreshToken } },
      { new: true }
    );

    // res.cookie('authToken', accessToken, { httpOnly: true }); // Send token as cookie
    res.json({
      status: 200,
      employee: {
        accessToken,
        refreshToken,
        employeeId: employee.employeeId,
        name: {
          firstName: employee.name.firstName,
          lastName: employee.name.lastName
        },
        address: {
          street: employee.address.street,
          city: employee.address.city,
          state: employee.address.state,
          country: employee.address.country
        },
        email: employee.email,
        contactNumber: employee.contactNumber,
        focus: employee.focus,
      },
      message: "Employee logged in successfully",
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
      message: "Your request cannot be processed. Please try again",
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
};

const refreshAccessToken = async (req, res) => {
  const { refreshToken } = req.body; // Assuming the refresh token is sent in the body
  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token is required" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const employee = await Employee.findById(decoded.id);

    console.log(employee);
    if (!employee || employee.refreshToken !== refreshToken) {
      return res
        .status(401)
        .json({ message: "Invalid or expired refresh token" });
    }

    // Generate new tokens
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      employee.signToken();

    await Employee.findByIdAndUpdate(
      employee._id,
      { $set: { refreshToken: newRefreshToken } },
      { new: true }
    );

    res.json({
      newAccessToken: newAccessToken,
      newRefreshToken: newRefreshToken,
      // Optionally return a new refresh token
    });
  } catch (error) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  loginEmployee,
  logoutEmployee,
  refreshAccessToken,
};
