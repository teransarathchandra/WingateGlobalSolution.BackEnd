const { EMAIL, PASSWORD } = process.env;

const mailConfig = {
    host: "smtp-mail.outlook.com",
    secureConnection: false, // Use SSL
    port: 587,
    tls: {
        ciphers: 'SSLv3'
    },
    auth: {
        user: EMAIL,
        pass: PASSWORD,
    },
};

module.exports = mailConfig;