const express = require('express');
const router = express.Router();

const { contactPersonController } = require('../../controllers');

router.get('/', contactPersonController.getAllContactPersons);
router.get('/:id', contactPersonController.getContactPersonById);
router.post('/', contactPersonController.createContactPerson);
router.put('/:id', contactPersonController.updateContactPerson);
router.delete('/:id', contactPersonController.deleteContactPerson);

module.exports = router;
