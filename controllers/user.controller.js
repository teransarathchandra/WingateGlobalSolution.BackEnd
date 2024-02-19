const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

const { User } = require('../models');
const { userSchema } = require('../schemas');
const { hashedPassword, BadRequestError, sendEmail, verifyGoogleToken } = require('../helpers');
const { emailTemplates } = require('../constants');

const getAllUsers = async (req, res) => {

    try {
        const users = await User.find();

        if (!users) {
            return res.status(404).json({ status: 404, message: 'User not found' });
        }

        res.status(200).json({ status: 200, data: users, message: 'Users found successfully' });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};

const getUserById = async (req, res) => {

    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: 'Invalid user id' });
        }

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ status: 404, message: 'User not found' });
        }

        res.status(200).json({ status: 200, data: user, message: 'User found successfully' });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};

const createUser = async (req, res) => {

    try {
        const { value, error } = userSchema.registerSchema.validate(req.body);

        if (error) {
            BadRequestError(error);
        }

        const { name, email, contactNumber, address, password } = value;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const user = new User({
            name,
            email,
            contactNumber,
            address,
            password,
        });


        // Generate access and refresh tokens
        const { accessToken, refreshToken } = user.signToken();

        // Save the refreshToken with the user
        user.refreshToken = refreshToken;
        await user.save();


        if (!user) {
            return res.status(400).json({ message: 'User cannot create' });
        }

        // sending response exclude the password and refresh token
        const userData = user.toObject();
        delete userData.password;
        delete userData.refreshToken;

        await sendEmail({
            to: email,
            subject: "Welcome to Wingate Global Solution!",
            html: emailTemplates.signUpEmailHTML(name.firstName),
        });

        res.status(201).json({ accessToken, data: userData, message: 'User created successfully' });

    } catch (err) {
        console.error(err);
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};

const updateUser = async (req, res) => {

    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: 'Invalid user id' });
        }

        const { value, error } = userSchema.updateSchema.validate(req.body);
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

        res.status(200).json({ status: 200, data: updatedUser, message: 'User updated successfully' });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};

const deleteUser = async (req, res) => {

    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: 'Invalid user id' });
        }

        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ status: 404, message: 'User not found' });
        }

        res.status(200).json({ status: 200, message: 'User deleted successfully' });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { value, error } = userSchema.loginSchema.validate(req.body);
        if (error) {
            BadRequestError(error);
        }

        const { email, password } = value;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ status: 400, message: 'Invalid email address, Please try again' });
        }

        if (!user.comparePassword(password)) {
            return res.status(400).json({ status: 400, message: 'Invalid password, Please try again' });
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
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};

const googleSignIn = async (req, res) => {
    try {
        const { token } = req.body;
        const googleUser = await verifyGoogleToken(token);

        let user = await User.findOne({ email: googleUser.email });
        if (!user) {
            // // If user does not exist, create a new user
            // user = new User({
            //     name: { firstName: googleUser.name, lastName: '' }, // Adjust according to your schema
            //     email: googleUser.email,
            //     password: '', // Consider a strategy for handling passwords for OAuth users
            //     contactNumber: '', // You might not have this information from Google
            //     // Add any other required fields as per your user schema
            // });
            // await user.save();

            return res.status(400).json({ status: 400, message: 'Invalid email address, Please try again' });
        }

        // Sign a JWT token or perform any other sign in logic you have
        const { accessToken, refreshToken } = user.signToken();

        // Update refreshToken in the database if necessary
        // Respond with tokens and user information (excluding sensitive information)
        res.status(200).json({
            accessToken,
            refreshToken,
            data: user,
            message: 'User logged in successfully'
        });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
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

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser, loginUser, googleSignIn, logoutUser, refreshAccessToken };