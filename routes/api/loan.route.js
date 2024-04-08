const express = require('express');
const router = express.Router();

const { loanController } = require('../../controllers');
const { isAuthorized } = require('../../middlewares');

router.get('/', isAuthorized, loanController.getAllLoans);
router.get('/:id', isAuthorized, loanController.getLoanById);
router.post('/', isAuthorized, loanController.createLoan);
router.put('/:id', isAuthorized, loanController.updateLoan);
router.delete('/:id', isAuthorized, loanController.deleteLoan);

module.exports = router;