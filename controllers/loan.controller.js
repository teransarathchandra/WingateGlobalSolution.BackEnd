const mongoose = require('mongoose');

const { Loan } = require('../models');
const { loanSchema } = require('../schemas');
const { BadRequestError } = require('../helpers');

const getAllLoans = async (req, res) => {

    try {
        const loans = await Loan.find();

        if (!loans) {
            return res.status(404).json({ status: 404, message: "Loan not found" });
        }

        res.status(200).json({ status: 200, data: loans, message: "Loan found successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
}

const getLoanById = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: "Invalid loan id" })
        }

        const loan = await Loan.findById(id);

        if (!loan) {
            return res.status(404).json({ status: 404, message: "Loan not found" });
        }

        res.status(200).json({ status: 200, data: loan, message: "Loan found successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};


const createLoan = async (req, res) => {

    try {
        const { value, error } = loanSchema.validate(req.body);

        if (error) {
            BadRequestError(error);
        }

        const { amount, interestRate, recurrence, startDate, endDate, employeeId } = value;

        const loan = await Loan.create({
            amount,
            interestRate,
            recurrence,
            startDate,
            endDate,
            employeeId
        });

        if (!loan) {
            return res.status(400).json({ message: 'Loan cannot create' });
        }

        res.status(201).json({ data: loan, message: 'Loan created successfully' });
    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }
};

const updateLoan = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: "Invalid loan id" });
        }

        const { value, error } = loanSchema.validate(req.body);

        if (error) {
            BadRequestError(error);
        }

        const updatedLoan = await Loan.findByIdAndUpdate(id, value, { new: true });

        if (!updatedLoan) {
            return res.status(404).json({ status: 404, message: "Loan not found" });
        }

        res.status(200).json({ status: 200, data: updatedLoan, message: "Loan updated successfully" });


    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }

}

const deleteLoan = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, message: "Invalid loan id" });
        }
        const deletedLoan = await Loan.findByIdAndDelete(id);

        if (!deletedLoan) {
            return res.status(404).json({ status: 404, message: "Loan not found" });

        }
        res.status(200).json({ status: 200, message: "Loan deleted successfully" });

    } catch (err) {
        res.status(400).json({
            error: err.message,
            message: 'Your request cannot be processed. Please try again'
        });
    }

};

module.exports = { getAllLoans, getLoanById, createLoan, updateLoan, deleteLoan };