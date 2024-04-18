const bcrypt = require("bcrypt");

const hashPassword = async function (next) {
    if (this.isModified('password') || this.isNew) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(this.password, salt);
            this.password = hash;
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
};

const hashedPassword = async function (password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);
    return hashedPassword;
};

module.exports = { hashPassword, hashedPassword };
