
const Expense = require('../models/Expense');
const xlsx = require('xlsx');
exports.addExpense = async (req, res) => {
    const userId = req.user.id;
    const { icon, category, amount, date } = req.body;

    try {
        if (!category || !amount || !date) {
            return res.status(400).json({ message: 'Category, amount, and date are required' });
        }
        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date
        });
        await newExpense.save();
        res.status(201).json(newExpense);
    } catch (error) {
        res.status(500).json({ message: 'Error adding expense', error });
    }
}

exports.getAllExpenses = async (req, res) => {
    const userId = req.user.id;
    try {
        const expenses = await Expense.find({ userId }).sort({ date: -1 });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching expenses', error });
    }
}

exports.deleteExpense = async (req, res) => {
    try {
        await Expense.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id
        });
        res.status(200).json({ message: 'Expense deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting expense', error });
    }
};

exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;
    try {
        const expenses = await Expense.find({ userId }).sort({ date: -1 });
        const data = expenses.map(item => ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date,
        }));
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, 'Expenses');
        xlsx.writeFile(wb, 'expense_details.xlsx');
        res.download('expense_details.xlsx');
    } catch (error) {
        console.error("Error downloading expense Excel:", error);
        res.status(500).json({ message: 'Error in downloading expense Excel', error });
    }
}       