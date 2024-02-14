const nodemailer = require("nodemailer");
const nodemailerConfig = require('../config/mail.config');
const { EMAIL } = process.env;

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
    try {
        const email = { ...data, from: EMAIL };
        await transport.sendMail(email);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Error in sending email');
    }
};

module.exports = sendEmail;