const mongoose = require('mongoose');

const Country = require('../models/country.model');
const CountrySchema = require('../schemas/country.schema');

const getAllCountries = async (req, res) => {

    try {
        const countries = await Country.find();

        if (!countries) {
            return res.status(404).json({ status: 404, message: "Countries Not Found" });
        }

        res.status(200).json({ status: 200, data: countries, message: "Countries Found" });

    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
}

const getCountryById = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, error: "Invalid Country Id" })
        }

        const country = await Country.findById(id);

        if (!country) {
            return res.status(404).json({ status: 404, message: "Country Not Found" });
        }

        res.status(200).json({ status: 200, data: country, message: "Country Found" });

    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
};


const createCountry = async (req, res) => {

    try {
        const { value, error } = CountrySchema.validate(req.body);

        if (error) {
            return res.status(400).json({ status: 400, error: error });
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
            return res.status(400).json({ message: 'Country Cannot Create' });
        }

        res.status(201).json({ data: country, message: 'Country Created Successfully' });
    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
};

const updateCountry = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, error: "Invalid Country id" });
        }

        const { value, error } = CountrySchema.validate(req.body);

        if (error) {
            return res.status(400).json({ status: 400, error: error });
        }

        const updatedCountry = await Country.findByIdAndUpdate(id, value, { new: true });

        if (!updatedCountry) {
            return res.status(404).json({ status: 404, message: "Country not found" });
        }

        res.status(200).json({ status: 200, data: updatedCountry, message: "Country Updated Successfully" });


    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }

}

const deleteCountry = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, error: "Invalid country id" });
        }
        const deletedCountry = await Country.findByIdAndDelete(id);

        if (!deletedCountry) {
            return res.status(404).json({ status: 404, message: "Country not found" });

        }
        res.status(200).json({ status: 200, message: "Country Deleted Successfully" });

    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }

};

module.exports = { getAllCountries, getCountryById, createCountry, updateCountry, deleteCountry };