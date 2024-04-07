const express = require('express');
const router = express.Router();

const { submittedDocumentController } = require('../../controllers');

router.get('/', submittedDocumentController.getAllSubmittedDocuments);
router.get('/:id', submittedDocumentController.getSubmittedDocumentById);
router.post('/', submittedDocumentController.createSubmittedDocument);
router.put('/:id', submittedDocumentController.updateSubmittedDocument);
router.delete('/:id', submittedDocumentController.deleteSubmittedDocument);

module.exports = router;