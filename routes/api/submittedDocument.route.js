const express = require('express');
const router = express.Router();

const { submittedDocumentController } = require('../../controllers');
const { isAuthorized } = require('../../middlewares');isAuthorized, 

router.get('/', isAuthorized, submittedDocumentController.getAllSubmittedDocuments);
router.get('/:id', isAuthorized, submittedDocumentController.getSubmittedDocumentById);
router.post('/', isAuthorized, submittedDocumentController.createSubmittedDocument);
router.put('/:id', isAuthorized, submittedDocumentController.updateSubmittedDocument);
router.delete('/:id', isAuthorized, submittedDocumentController.deleteSubmittedDocument);

module.exports = router;