const mongoose = require('mongoose');

const Loan = require('../models/loan.model');
const LoanSchema = require('../schemas/loan.schema');

const getAllLoans = async (req, res) => {

    try {
        const loans = await Loan.find();

        if (!loans) {
            return res.status(404).json({ status: 404, message: "Loan Not Found" });
        }

        res.status(200).json({ status: 200, data: loans, message: "Loan Found" });

    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
}

const getLoanById = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, error: "Invalid Loan Id" })
        }

        const loan = await Loan.findById(id);

        if (!loan) {
            return res.status(404).json({ status: 404, message: "Loan Not Found" });
        }

        res.status(200).json({ status: 200, data: loan, message: "Loan Found" });

    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
};


const createLoan = async (req, res) => {

    try {
        const { value, error } = LoanSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ status: 400, error: error });
        }

        const { loanId, amount, interestRate, recurrence, startDate, endDate, employeeId } = value;

        const loan = await Loan.create({
            loanId,
            amount,
            interestRate,
            recurrence,
            startDate,
            endDate,
            employeeId
        });

        if (!loan) {
            return res.status(400).json({ message: 'Loan Cannot Create' });
        }

        res.status(201).json({ data: loan, message: 'Loan Created Successfully' });
    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }
};

const updateLoan = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, error: "Invalid Loan id" });
        }

        const { value, error } = LoanSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ status: 400, error: error });
        }

        const updatedLoan = await Loan.findByIdAndUpdate(id, value, { new: true });

        if (!updatedLoan) {
            return res.status(404).json({ status: 404, message: "Loan not found" });
        }

        res.status(200).json({ status: 200, data: updatedLoan, message: "Loan Updated Successfully" });


    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }

}

const deleteLoan = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 404, error: "Invalid loan id" });
        }
        const deletedLoan = await Loan.findByIdAndDelete(id);

        if (!deletedLoan) {
            return res.status(404).json({ status: 404, message: "Loan not found" });

        }
        res.status(200).json({ status: 200, message: "Loan Deleted Successfully" });

    } catch (err) {
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.',
            message: err.message
        });
    }

};

module.exports = { getAllLoans, getLoanById, createLoan, updateLoan, deleteLoan };