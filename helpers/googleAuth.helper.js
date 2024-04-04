const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const verifyGoogleToken = async (token) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        return {
            email: payload.email,
            name: payload.name,
            picture: payload.picture,
            verified_email: payload.email_verified,
        };
    } catch (error) {
        console.error('Error verifying Google token:', error);
        throw new Error('Error verifying Google token');
    }
};

module.exports = verifyGoogleToken;