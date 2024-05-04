const mongoose = require("mongoose");

const { SystemAccess } = require('../models');
const { systemAccessSchema } = require('../schemas');
const { BadRequestError } = require('../helpers');

const getAllSystemAccess = async (req, res) => {
  try {
    const systemAccess = await SystemAccess.find();

    if (!systemAccess) {
      res.status(404).json({ status: 404, message: "System access not found" });
    }

    res.status(200).json({
      status: 200,
      data: systemAccess,
      message: "System access found successfully",
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
      message: "Your request cannot be processed. Please try again",
    });
  }
};

const getSystemAccessById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ status: 400, message: "Invalid system access id" });
    }

    const systemAccess = await SystemAccess.findById(id);

    if (!systemAccess) {
      return res
        .status(404)
        .json({ status: 404, message: "System access not found" });
    }

    res.status(200).json({
      status: 200,
      data: systemAccess,
      message: "System access found successfully",
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
      message: "Your request cannot be processed. Please try again",
    });
  }
};

const createSystemAccess = async (req, res) => {
  try {
    const { value, error } = systemAccessSchema.validate(req.body);

    if (error) {
      BadRequestError(error);
    }

    const { description, accessAreas } = value;

    const systemAccess = await SystemAccess.create({
      description,
      accessAreas
    });

    if (!systemAccess) {
      return res.status(400).json({ message: "System access cannot create" });
    }

    res.status(201).json({
      data: systemAccess,
      message: "System access created successfully",
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
      message: "Your request cannot be processed. Please try again",
    });
  }
};

const updateSystemAccess = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.body, "     ", req.params);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ status: 404, message: "Invalid system access id" });
    }

    const { value, error } = systemAccessSchema.validate(req.body);

    if (error) {
      BadRequestError(error);
    }

    const updatedSystemAccess = await SystemAccess.findByIdAndUpdate(
      id,
      value,
      { new: true }
    );

    if (!updatedSystemAccess) {
      return res
        .status(404)
        .json({ status: 404, message: "System access not found" });
    }
    console.log("Acccess Updated");
    res.status(200).json({
      status: 200,
      data: updatedSystemAccess,
      message: "System access updated successfully",
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
      message: "Your request cannot be processed. Please try again",
    });
  }
};

const deleteSystemAccess = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ status: 404, message: "Invalid system access id" });
    }

    const deletedSystemAccess = await SystemAccess.findByIdAndDelete(id);

    if (!deletedSystemAccess) {
      return res
        .status(404)
        .json({ status: 404, message: "System access not found" });
    }

    res
      .status(200)
      .json({ status: 200, message: "System access deleted successfully" });
  } catch (err) {
    res.status(404).json({
      error: err.message,
      message: "Your request cannot be processed. Please try again",
    });
  }
};

module.exports = {
  getAllSystemAccess,
  getSystemAccessById,
  createSystemAccess,
  updateSystemAccess,
  deleteSystemAccess,
};
