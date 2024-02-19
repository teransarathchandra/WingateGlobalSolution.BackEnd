const mongoose = require('mongoose');

const { Country } = require('../models');
const { countrySchema } = require('../schemas');

const getAllCountries = async (req, res) => {

    try {
        const countries = await Country.find();

        if (!countries) {
            return res.status(404).json({ status: 404, message: "Countries not found" });
        }

        res.status(200).json({ status: 200, data: countries, message: "Countries found successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
}

const getCountryById = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: "Invalid country id" })
        }

        const country = await Country.findById(id);

        if (!country) {
            return res.status(404).json({ status: 404, message: "Country not found" });
        }

        res.status(200).json({ status: 200, data: country, message: "Country found successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};


const createCountry = async (req, res) => {

    try {
        const { value, error } = countrySchema.validate(req.body);

        if (error) {
            return res.status(400).json({ status: 400, message: error });
        }

        const { countryId, countryCode, name, mobileCode, currency, exchangeRate } = value;

        const country = await Country.create({
            countryId,
            countryCode,
            name,
            mobileCode,
            currency,
            exchangeRate
        });

        if (!country) {
            return res.status(400).json({ message: 'Country cannot create' });
        }

        res.status(201).json({ data: country, message: 'Country created successfully' });
    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};

const updateCountry = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: "Invalid country id" });
        }

        const { value, error } = countrySchema.validate(req.body);

        if (error) {
            return res.status(400).json({ status: 400, message: error });
        }

        const updatedCountry = await Country.findByIdAndUpdate(id, value, { new: true });

        if (!updatedCountry) {
            return res.status(404).json({ status: 404, message: "Country not found" });
        }

        res.status(200).json({ status: 200, data: updatedCountry, message: "Country updated successfully" });


    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }

}

const deleteCountry = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: "Invalid country id" });
        }
        const deletedCountry = await Country.findByIdAndDelete(id);

        if (!deletedCountry) {
            return res.status(404).json({ status: 404, message: "Country not found" });

        }
        res.status(200).json({ status: 200, message: "Country deleted successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }

};

module.exports = { getAllCountries, getCountryById, createCountry, updateCountry, deleteCountry };