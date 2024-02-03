const express = require('express');
const router = express.Router();

const { getAllRequiredDocuments, getRequiredDocumentById, createRequiredDocument, updateRequiredDocument, deleteRequiredDocument } = require('../../controller/requiredDocumentController');

router.get('/', getAllRequiredDocuments);
router.get('/:id', getRequiredDocumentById);
router.post('/', createRequiredDocument);
router.put('/:id', updateRequiredDocument);
router.delete('/:id', deleteRequiredDocument);

module.exports = router;