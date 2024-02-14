const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRES, REFRESH_TOKEN_SECRET } = process.env;

const generateAccessToken = (payload) => {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES });
}

const generateRefreshToken = (payload) => {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET);
}

const signToken = function () {
    const payload = { id: this._id };
    
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    return { accessToken, refreshToken };
};

module.exports = signToken;