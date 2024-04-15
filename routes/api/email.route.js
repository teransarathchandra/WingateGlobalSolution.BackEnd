const express = require("express");
const router = express.Router();

const { emailController } = require('../../controllers');
const { isAuthorized } = require('../../middlewares');

router.post("/", isAuthorized, emailController.sendEmails);

module.exports = router;