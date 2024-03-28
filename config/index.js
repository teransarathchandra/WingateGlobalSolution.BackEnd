const connectDatabase = require('./database.config');
const mailConfig = require('./mail.config');
const frontEndHostConfig = require('./frontEnd.config');

module.exports = { connectDatabase, mailConfig, frontEndHostConfig };