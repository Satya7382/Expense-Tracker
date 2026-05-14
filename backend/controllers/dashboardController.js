const Income = require('../models/Income');
const Expense = require('../models/Expense');
const mongoose = require('mongoose');

const getDashboardData = async (req, res) => {
    try {

        const userId = new mongoose.Types.ObjectId(req.user.id);

        // DATE BOUNDARIES

        const now = new Date();

        const last30DaysDate = new Date();
        last30DaysDate.setDate(now.getDate() - 30);

        const last60DaysDate = new Date();
        last60DaysDate.setDate(now.getDate() - 60);

        // TOTAL INCOME
        const totalIncomeAgg = await Income.aggregate([
            {
                $match: { userId }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$amount" }
                }
            }
        ]);

        // TOTAL EXPENSE

        const totalExpenseAgg = await Expense.aggregate([
            {
                $match: { userId }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$amount" }
                }
            }
        ]);

        // LAST 60 DAYS INCOME

        const last60DaysIncomeTransactions = await Income.find({
            userId,
            date: {
                $gte: last60DaysDate,
                $lte: now
            }
        })
            .sort({ date: -1 })
            .lean();

        const incomeLast60Days = last60DaysIncomeTransactions.reduce(
            (sum, txn) => sum + txn.amount,
            0
        );

        // LAST 30 DAYS EXPENSES

        const last30DaysExpenseTransactions = await Expense.find({
            userId,
            date: {
                $gte: last30DaysDate,
                $lte: now
            }
        })
            .sort({ date: -1 })
            .lean();

        const expensesLast30Days = last30DaysExpenseTransactions.reduce(
            (sum, txn) => sum + txn.amount,
            0
        );

        // RECENT TRANSACTIONS

        const income = await Income.find({ userId })
            .sort({ date: -1 })
            .limit(5)
            .lean();

        const expense = await Expense.find({ userId })
            .sort({ date: -1 })
            .limit(5)
            .lean();

        const recentTransactions = [
            ...income.map((txn) => ({
                ...txn,
                type: "income"
            })),

            ...expense.map((txn) => ({
                ...txn,
                type: "expense"
            }))
        ]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5);

        // FINAL VALUES

        const totalIncome = totalIncomeAgg[0]?.total || 0;
        const totalExpenses = totalExpenseAgg[0]?.total || 0;

        res.status(200).json({
            totalBalance: totalIncome - totalExpenses,

            totalIncome,
            totalExpenses,

            last60DaysIncome: {
                total: incomeLast60Days,
                transactions: last60DaysIncomeTransactions
            },

            last30DaysExpenses: {
                total: expensesLast30Days,
                transactions: last30DaysExpenseTransactions
            },

            recentTransactions
        });

    } catch (error) {

        console.error("Dashboard Error:", error);

        res.status(500).json({
            message: "Error fetching dashboard data",
            error: error.message
        });
    }
};

module.exports = {
    getDashboardData
};