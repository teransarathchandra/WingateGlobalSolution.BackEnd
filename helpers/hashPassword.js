const bcrypt = require("bcrypt");

const hashPassword = async function (next) {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;
    next();
};

const hashedPassword = async function (password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    return hashedPassword;
};

module.exports = { hashPassword, hashedPassword };
