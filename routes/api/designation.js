const express = require('express');
const router = express.Router();

const { createDesignation, getAllDesignations, getDesignationById, updateDesignation, deleteDesignation} = require('../../controller/designationController');

router.get('/', getAllDesignations)
router.get('/:id', getDesignationById)
router.post('/', createDesignation);
router.put('/:id', updateDesignation);
router.delete('/:id', deleteDesignation);

module.exports = router;