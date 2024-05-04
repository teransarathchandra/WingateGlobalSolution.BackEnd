const express = require('express');
const router = express.Router();

const { countryController } = require('../../controllers');
const { isAuthorized } = require('../../middlewares');

router.get('/', isAuthorized, countryController.getAllCountries);
router.get('/:id', isAuthorized, countryController.getCountryById);
router.post('/', isAuthorized, countryController.createCountry);
router.patch('/:id', isAuthorized, countryController.updateCountry);
router.delete('/:id', isAuthorized, countryController.deleteCountry);
router.get('/countrycode/:countryCode', isAuthorized, countryController.getCountryByCountyCode);

module.exports = router;