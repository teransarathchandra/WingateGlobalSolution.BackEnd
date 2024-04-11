const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const { User ,Order } = require('../models');
const { userSchema } = require('../schemas');
const { hashedPassword, BadRequestError, sendEmail, verifyGoogleToken } = require('../helpers');
const { frontEndHostConfig } = require('../config')
const { emailTemplates } = require('../constants');
const { generateVerificationToken } = require('../utils');
const userOrdersAgg = require('../aggregates/userOrders.aggregate');

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

        if (!user) {
            return res.status(400).json({ message: 'User cannot create' });
        }

        // Generate verification token
        const verificationToken = generateVerificationToken();
        user.verificationToken = verificationToken;

        // Generate access and refresh tokens
        const { refreshToken } = user.signToken();

        // Save the refreshToken with the user
        user.refreshToken = refreshToken;
        await user.save();

        // sending response exclude the password and refresh token
        // const userData = user.toObject();
        // delete userData.password;
        // delete userData.accessToken;
        // delete userData.refreshToken;

        const userData = {
            userId: user.userId,
            name: user.name,
            email: user.email,
            contactNumber: user.contactNumber,
            address: user.address,
            emailVerified: user.emailVerified,
        };

        const verificationLink = `${frontEndHostConfig.verificationLinkHost}/verify-email/${verificationToken}`;

        await sendEmail({
            to: email,
            subject: "Verify Your Email",
            html: emailTemplates.emailVerification({ name: name.firstName, link: verificationLink }),
        });

        // await sendEmail({
        //     to: email,
        //     subject: "Welcome to Wingate Global Solution!",
        //     html: emailTemplates.signUpEmailHTML(name.firstName),
        // });

        res.status(201).json({ data: userData, message: 'User created successfully' });

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

        if (!user.emailVerified) {
            return res.status(403).json({ status: 403, message: 'User account not verified. Please check your email to verify your account.' });
        }

        if (!user.comparePassword(password)) {
            return res.status(400).json({ status: 400, message: 'Invalid password, Please try again' });
        }

        const { accessToken, refreshToken } = user.signToken();
        await User.findByIdAndUpdate(user._id, { $set: { refreshToken: refreshToken } }, { new: true });

        // res.cookie('authToken', accessToken, { httpOnly: true }); // Send token as cookie
        res.json({
            status: 200,
            // accessToken,
            // refreshToken,
            user: {
                userId: user.userId,
                firstName: user.name.firstName,
                lastName: user.name.lastName,
                email: user.email,
                contactNumber: user.contactNumber,
                address: user.address,
                accessToken,
                refreshToken,
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

        const user = await User.findOne({ email: googleUser.email });
        if (!user) {
            return res.status(400).json({ status: 400, message: 'Invalid email address, Please try again' });
        }

        if (!user.emailVerified) {
            return res.status(403).json({ status: 403, message: 'User account not verified. Please check your email to verify your account.' });
        }

        // Sign a JWT token or perform any other sign in logic you have
        const { accessToken, refreshToken } = user.signToken();
        await User.findByIdAndUpdate(user._id, { $set: { refreshToken: refreshToken } }, { new: true });

        // res.cookie('authToken', accessToken, { httpOnly: true }); // Send token as cookie
        res.status(200).json({
            status: 200,
            accessToken,
            refreshToken,
            user: {
                userId: user.userId,
                firstName: user.name.firstName,
                lastName: user.name.lastName,
                email: user.email,
                contactNumber: user.contactNumber,
                address: user.address,
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

const logoutUser = async (req, res) => {

    try {
        const { id } = req.body;

        await User.findByIdAndUpdate(id, { $unset: { refreshToken: "" } });

        res.status(200).json({ message: "Logout successful." });
    } catch (error) {
        res.status(500).json({ message: "An error occurred during logout." });
    }
}

const verifyEmail = async (req, res) => {
    try {
        const token = req.params.token;
        if (!token) {
            return res.status(400).json({ message: 'Invalid or expired verification token', isUserVerified: false });
        }

        const user = await User.findOne({ verificationToken: token });
        if (!user) {
            return res.status(400).json({ message: 'Invalid verification token or Email is already verified.', isUserVerified: false });
        }

        if (user.emailVerified) {
            return res.status(403).json({ status: 403, message: 'User account already verified.', isUserVerified: true });
        }

        const tokenAge = Date.now() - new Date(user.createdAt).getTime();
        const twoDaysInMilliseconds = 48 * 60 * 60 * 1000;
        if (tokenAge > twoDaysInMilliseconds) {
            return res.status(400).json({ message: 'Verification token is expired. Please request a new verification link.', isUserVerified: false });
        }

        user.emailVerified = true;
        user.verificationToken = undefined; // Clear the verification token
        await user.save();

        await sendEmail({
            to: user.email,
            subject: "Welcome to Wingate Global Solution!",
            html: emailTemplates.signUpEmailHTML(user.name.firstName),
        });

        const { accessToken } = user.signToken();

        res.status(200).json({
            message: 'Email verified successfully', isUserVerified: true, status: 200,
            accessToken,
            user: {
                userId: user.userId,
                firstName: user.name.firstName,
                lastName: user.name.lastName,
                email: user.email,
                contactNumber: user.contactNumber,
                address: user.address,
            },
        });
    } catch (err) {
        res.status(500).json({ message: 'An error occurred', isUserVerified: false, error: err.message });
    }
};

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

        // // Generate a new access cancelToken: new CancelToken(()=>{})
        // const newAccessToken = user.signToken().accessToken;
        // const newRefreshToken = user.signToken().refreshToken;

        // Generate new tokens
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = user.signToken();


        await User.findByIdAndUpdate(user._id, { $set: { refreshToken: newRefreshToken } }, { new: true });

        res.json({
            newAccessToken: newAccessToken,
            newRefreshToken: newRefreshToken,
            // Optionally return a new refresh token
        });
    } catch (error) {
        return res.status(403).json({ message: "Invalid refresh token" });
    }
};


// In user.controller.js

const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(404).json({ message: "Invalid user ID" });
        }

        const orders = await Order.aggregate([
            {
                '$lookup': {
                    'from': 'users', // Ensure this matches the name of your user collection in MongoDB
                    'localField': 'userId', // Field in the orders collection
                    'foreignField': '_id', // Assuming this is the correct field to join on in the users collection
                    'as': 'userDetails' // The result of the join will be stored here
                }
            },
            {
                '$match': {
                    'userId': new mongoose.Types.ObjectId(userId)
                }
            },
            {
                '$unwind': {
                    'path': '$userDetails', // Unwind the userDetails to flatten
                    'preserveNullAndEmptyArrays': true // Optional: Keeps orders even if there's no matching user
                }
            }, {
                '$project': {
                  '_id': 1, 
                  'orderId': 1, 
                  'createdAt': 1, 
                  'status' : 1,
                  'userId': '$userDetails.userId'
                }
            }
        ]);
        // const user = await User.findById(userId);



        if (!orders) {
            return res.status(404).json({ message: "No orders found for this user" });
        }

        res.json({ data: orders });
    } catch (error) {
        console.error('Error fetching user orders:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser, loginUser, googleSignIn, logoutUser, verifyEmail, refreshAccessToken, getUserOrders };