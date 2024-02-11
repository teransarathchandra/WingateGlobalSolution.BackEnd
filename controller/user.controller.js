const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

const User = require('../models/user.model');
const { registerSchema, loginSchema, updateSchema } = require('../schemas/userSchema');
const { hashedPassword, BadRequestError } = require('../helpers');

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
            BadRequestError(error);
        }

        const { userId, name, email, contactNumber, address, username, password, countryId } = value;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        // Insert the user
        // const user = await User.create({
        //     userId,
        //     name,
        //     email,
        //     contactNumber,
        //     address,
        //     username,
        //     password,
        //     countryId
        // });

        //Create the user
        const user = new User({
            userId,
            name,
            email,
            contactNumber,
            address,
            username,
            password,
            countryId
        });


        // Generate access and refresh tokens
        const { accessToken, refreshToken } = user.signToken();

        // Save the refreshToken with the user
        user.refreshToken = refreshToken;
        await user.save();


        if (!user) {
            return res.status(400).json({ message: 'User Cannot Create' });
        }

        // sending response exclude the password and refresh token
        const userData = user.toObject();
        delete userData.password;
        delete userData.refreshToken;


        res.status(201).json({ accessToken, data: userData, message: 'User Created Successfully' });

    } catch (err) {
        console.error(err);
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
            BadRequestError(error);
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
            BadRequestError(error);
        }

        const { email, password } = value;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ status: 400, message: 'Invalid Email Address, Please try again' });
        }

        if (!user.comparePassword(password)) {
            return res.status(400).json({ status: 400, message: 'Invalid Password, Please try again' });
        }

        const { accessToken, refreshToken } = user.signToken();
        await User.findByIdAndUpdate(user._id, { $set: { refreshToken: refreshToken } }, { new: true });

        res.json({
            status: 200,
            accessToken,
            refreshToken,
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

const logoutUser = async (req, res) => {
    const { id } = req.body;

    try {
        // Invalidate the refresh token by setting it to null or removing it
        await User.findByIdAndUpdate(id, { $unset: { refreshToken: "" } });

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
        const user = await User.findById(decoded.id);

        if (!user || user.refreshToken !== refreshToken) {
            return res.status(401).json({ message: "Invalid or expired refresh token" });
        }

        // Generate a new access cancelToken: new CancelToken(()=>{})
        const newAccessToken = user.signToken().accessToken;
        const newRefreshToken = user.signToken().refreshToken;

        await User.findByIdAndUpdate(user._id, { $set: { refreshToken: refreshToken } }, { new: true });

        res.json({
            newAccessToken: newAccessToken,
            newRefreshToken: newRefreshToken,
            // Optionally return a new refresh token
        });
    } catch (error) {
        return res.status(403).json({ message: "Invalid refresh token" });
    }
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser, loginUser, logoutUser, refreshAccessToken };