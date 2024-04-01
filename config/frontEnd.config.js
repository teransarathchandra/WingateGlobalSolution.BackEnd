require('dotenv').config();

const frontEndHostConfig = {
    verificationLinkHost: process.env.FRONT_END_HOST_URL,
};

module.exports = frontEndHostConfig;