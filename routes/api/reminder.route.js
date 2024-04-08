const express = require('express');
const router = express.Router();

const { reminderController } = require('../../controllers');
const { isAuthorized } = require('../../middlewares');

router.get('/', isAuthorized, reminderController.getAllReminder);
router.get('/:id', isAuthorized, reminderController.getReminderById);
router.post('/', isAuthorized, reminderController.createReminder);
router.put('/:id', isAuthorized, reminderController.updateReminder);
router.delete('/:id', isAuthorized, reminderController.deleteReminder);

module.exports = router;