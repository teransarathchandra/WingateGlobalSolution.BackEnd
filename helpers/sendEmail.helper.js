// const nodemailer = require("nodemailer");
// const nodemailerConfig = require('../config/mail.config');
// const { EMAIL } = process.env;

// const transport = nodemailer.createTransport(nodemailerConfig);

// const sendEmail = async (data) => {
//     try {
//         const email = { ...data, from: EMAIL };
//         await transport.sendMail(email);
//         return true;
//     } catch (error) {
//         console.error('Error sending email:', error);
//         throw new Error('Error in sending email');
//     }
// };

// module.exports = sendEmail;


const { EmailClient } = require("@azure/communication-email");
const { AZURE_SENDER_EMAIL, AZURE_COMMUNICATION_SERVICES_CONNECTION_STRING } = process.env;

const client = new EmailClient(AZURE_COMMUNICATION_SERVICES_CONNECTION_STRING);

const sendEmail = async (data) => {
    const emailMessage = {
        senderAddress: AZURE_SENDER_EMAIL,
        content: {
            subject: data.subject,
            plainText: data.text,
            html: data.html,
        },
        recipients: {
            to: [{ address: data.to }],
        },
    };

    try {
        const poller = await client.beginSend(emailMessage);
        await poller.pollUntilDone();
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Error in sending email');
    }
};

module.exports = sendEmail;