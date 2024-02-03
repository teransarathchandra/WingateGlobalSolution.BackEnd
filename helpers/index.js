const { hashPassword, hashedPassword } = require("./hashPassword");
const comparePassword = require("./comparePassword");

module.exports = {
  hashPassword,
  hashedPassword,
  comparePassword,
};