const crypto = require('crypto');

const generateVerificationToken = () => {
    return crypto.randomBytes(20).toString('hex');
};

module.exports = { generateVerificationToken };