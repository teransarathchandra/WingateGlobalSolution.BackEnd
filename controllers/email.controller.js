const { emailSchema } = require("../schemas");
const { BadRequestError, sendEmail } = require("../helpers");

const sendEmails = async (req, res, next) => {

    try {
        const { value, error } = emailSchema.validate(req.body, { abortEarly: false });
        if (error) {
            return BadRequestError(error, req, res, next);
        }

        const { toEmail, emailSubject, emailBody } = value;

        const helpEmail = {
            to: toEmail,
            subject: emailSubject,
            html: emailBody
        };

        await sendEmail(helpEmail);

        res.json({
            message: "Your email has been sent",
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({status: 500, message: "An error occurred while sending the email. Please try again later." });
    }
};

module.exports = { sendEmails };