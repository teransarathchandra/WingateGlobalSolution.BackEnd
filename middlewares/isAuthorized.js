const jwt = require("jsonwebtoken");
const { HttpError } = require("../helpers");
const Employee = require('../models/employee.model');

const { ACCESS_TOKEN_SECRET } = process.env;

const isAuthorized = async (req, res, next) => {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer" || !token) {
        return next(HttpError(401, "Access token is missing or invalid"));
    }

    try {
        const isValidToken = jwt.verify(token, ACCESS_TOKEN_SECRET);

        const employee = await Employee.findById(isValidToken.id);
        // if (!employee || token !== employee.accessToken || !employee.accessToken)
        //     throw HttpError(401);
        if (!employee)
            throw HttpError(401);

        req.employee = employee;
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
