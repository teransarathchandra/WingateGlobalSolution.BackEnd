const express = require('express');
const router = express.Router();

const { getAllContactPersons, getContactPersonById, createContactPerson, updateContactPerson, deleteContactPerson } = require('../../controller/contactPerson.controller');

router.get('/', getAllContactPersons);
router.get('/:id', getContactPersonById);
router.post('/', createContactPerson);
router.put('/:id', updateContactPerson);
router.delete('/:id', deleteContactPerson);

module.exports = router;
