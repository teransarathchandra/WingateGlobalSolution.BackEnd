const jwt = require("jsonwebtoken");
const { HttpError } = require("../helpers");
const Employee = require('../models/employee.model');
const User = require('../models/user.model');

const { ACCESS_TOKEN_SECRET } = process.env;

const isAuthorized = async (req, res, next) => {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer" || !token) {
        return next(HttpError(401, "Access token is missing or invalid"));
    }

    // const token = req.cookies.authToken;
    // if (!token) return res.status(403).send("A token is required for authentication");

    try {
        const isValidToken = jwt.verify(token, ACCESS_TOKEN_SECRET);

        const user = await User.findById(isValidToken.id);
        const employee = await Employee.findById(isValidToken.id);
        // if (!employee || token !== employee.accessToken || !employee.accessToken)
        //     throw HttpError(401);
        if (!employee && !user)
            throw HttpError(401);

        if (employee)
            req.employee = employee;

        if (user)
            req.user = user;
        
        next();
    } catch (error) {
        if (
            error.message === "invalid signature" ||
            error.message === "jwt expired" ||
            error.message === "jwt must be provided"
        ) {
            error.status = 401;
            error.message = "Unauthorized";
        }
        next(HttpError(401, error.message));
    }
};

module.exports = isAuthorized;
