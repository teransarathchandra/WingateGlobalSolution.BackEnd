const express = require("express");
const router = express.Router();

const { emailController } = require('../../controllers');

router.post("/", emailController.sendEmails);

module.exports = router;