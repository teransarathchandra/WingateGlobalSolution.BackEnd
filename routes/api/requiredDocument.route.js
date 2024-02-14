const express = require('express');
const router = express.Router();

const { requiredDocumentController } = require('../../controllers');

router.get('/', requiredDocumentController.getAllRequiredDocuments);
router.get('/:id', requiredDocumentController.getRequiredDocumentById);
router.post('/', requiredDocumentController.createRequiredDocument);
router.put('/:id', requiredDocumentController.updateRequiredDocument);
router.delete('/:id', requiredDocumentController.deleteRequiredDocument);

module.exports = router;