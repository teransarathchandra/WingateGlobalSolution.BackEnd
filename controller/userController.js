const mongoose = require('mongoose');

const User = require('../models/user.model');
const UserSchema = require('../schemas/userSchema')



const getAllUser = async (req, res) => {

    try {
        const user = await User.find();

        if (!user) {
            return res.status(404).json({ status: 404, message: "User not found" });
        }

        res.status(200).json({ status: 200, data: user, message: "User Found" });

    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
}

const getUserById = async (req, res) => {

    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, error: "Invalid user id" })
        }

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ status: 404, message: "User not found" });
        }

        res.status(200).json({ status: 200, data: user, message: "User Found" });
    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
};



const createUser = async (req, res) => {

    try {
        const { value, error } = UserSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ status: 400, error: error });
        }

        const { userId, firstName, lastName, email, contactNumber, address, username, password, countryId } = value;

        const user = await User.create({
            userId,
            firstName,
            lastName,
            email,
            contactNumber,
            address,
            username,
            password,
            countryId
        });

        if (!user) {
            return res.status(400).json({ message: 'User Cannot Create' });
        }

        res.status(201).json({ data: user, message: 'User Created Successfully' });

    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
};

const updateUser = async (req, res) => {

    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, error: "Invalid user id" });
        }

        const { value, error } = UserSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ status: 400, error: error });
        }

        const updatedUser = await User.findByIdAndUpdate(id, value, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ status: 404, message: "User not found" });
        }

        res.status(200).json({ status: 200, data: updatedUser, message: "User Updated Successfully" });

    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
};

const deleteUser = async (req, res) => {

    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, error: "Invalid User id" });
        }

        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ status: 404, message: "User not found" });
        }

        res.status(200).json({ status: 200, message: "User Deleted Successfully" });

    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
};


module.exports = {getAllUser, getUserById, createUser, updateUser, deleteUser}
