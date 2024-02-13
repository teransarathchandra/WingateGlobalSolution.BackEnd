const express = require('express');
const router = express.Router();

const { getAllCountries, getCountryById, createCountry, updateCountry, deleteCountry } = require('../../controller/country.controller');

router.get('/', getAllCountries);
router.get('/:id', getCountryById);
router.post('/', createCountry);
router.put('/:id', updateCountry);
router.delete('/:id', deleteCountry);

module.exports = router;