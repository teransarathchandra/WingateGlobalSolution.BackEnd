const mongoose = require('mongoose');

const User = require('../models/user.model');
const { registerSchema, loginSchema, updateSchema } = require('../schemas/userSchema');
const { hashedPassword } = require('../helpers');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();

        if (!users) {
            return res.status(404).json({ status: 404, message: 'User not found' });
        }

        res.status(200).json({ status: 200, data: users, message: 'Users Found' });

    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, error: 'Invalid user id' });
        }

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ status: 404, message: 'User not found' });
        }

        res.status(200).json({ status: 200, data: user, message: 'User Found' });

    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
};

const createUser = async (req, res) => {
    try {
        const { value, error } = registerSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ status: 400, error: error });
        }

        const { userId, name, email, contactNumber, address, username, password, countryId } = value;

        const user = await User.create({
            userId,
            name,
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
            return res.status(404).json({ status: 404, error: 'Invalid user id' });
        }

        const { value, error } = updateSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ status: 400, error: error });
        }

        if (value.password) {
            value.password = await hashedPassword(value.password);
        }

        const updatedUser = await User.findByIdAndUpdate(id, value, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ status: 404, message: 'User not found' });
        }

        res.status(200).json({ status: 200, data: updatedUser, message: 'User Updated Successfully' });

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
            return res.status(404).json({ status: 404, error: 'Invalid User id' });
        }

        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ status: 404, message: 'User not found' });
        }

        res.status(200).json({ status: 200, message: 'User Deleted Successfully' });

    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { value, error } = loginSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ status: 400, error: error });
        }

        const { email, password } = value;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ status: 400, message: 'Invalid Email Address, Please try again' });
        }

        if (!user.comparePassword(password)) {
            return res.status(400).json({ status: 400, message: 'Invalid Password, Please try again' });
        }

        res.json({
            status: 200,
            user: {
                firstName: user.firstName,
                email: user.email,
                contactNumber: user.contactNumber
            },
            message: 'User logged in successfully'
        });

    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser, loginUser };
