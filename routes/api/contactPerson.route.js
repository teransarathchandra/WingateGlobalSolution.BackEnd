const express = require('express');
const router = express.Router();

const { contactPersonController } = require('../../controllers');
const { isAuthorized } = require('../../middlewares');

router.get('/', isAuthorized, contactPersonController.getAllContactPersons);
router.get('/:id', isAuthorized, contactPersonController.getContactPersonById);
router.post('/', isAuthorized, contactPersonController.createContactPerson);
router.put('/:id', isAuthorized, contactPersonController.updateContactPerson);
router.delete('/:id', isAuthorized, contactPersonController.deleteContactPerson);

module.exports = router;
