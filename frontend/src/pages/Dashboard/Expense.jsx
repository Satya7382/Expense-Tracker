import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import ExpenseOverview from "../../components/Expense/ExpenseOverview";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Modal from "../../components/Modal";
import AddExpense from "../../components/Expense/AddExpense";
import { toast } from "react-hot-toast";
import ExpenseList from "../../components/Expense/ExpenseList";

const Expense = () => {

  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

  // Fetch Expense Details
  const fetchExpenseDetails = async () => {

    if (loading) return;

    setLoading(true);

    try {

      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.GET_ALL_EXPENSE
      );

      if (response.data) {
        setExpenseData(response.data);
      }

    } catch (error) {

      console.log(
        "Something went wrong. Please try again.",
        error
      );

    } finally {

      setLoading(false);

    }
  };

  // Add Expense
  const handleAddExpense = async (expense) => {

    try {

      const { category, amount, date, icon } = expense;

      if (!category.trim()) {
        toast.error("Expense category is required.");
        return;
      }

      if (!amount || isNaN(amount) || Number(amount) <= 0) {
        toast.error("Please enter a valid amount greater than 0.");
        return;
      }

      if (!date.trim()) {
        toast.error("Date is required.");
        return;
      }

      if (new Date(date) > new Date()) {
        toast.error("Date cannot be in the future.");
        return;
      }

      if (!icon) {
        toast.error("Icon is required.");
        return;
      }

      await axiosInstance.post(
        API_PATHS.EXPENSE.ADD_EXPENSE,
        {
          category,
          amount,
          date,
          icon,
        }
      );

      setOpenAddExpenseModal(false);

      toast.success("Expense added successfully.");

      fetchExpenseDetails();

    } catch (error) {

      console.log(
        "Something went wrong. Please try again.",
        error.response?.data?.message || error.message
      );
    }
  };

  // Delete Expense
  const deleteExpense = async (id) => {

    try {

      await axiosInstance.delete(
        API_PATHS.EXPENSE.DELETE_EXPENSE(id)
      );

      toast.success("Expense deleted successfully.");

      fetchExpenseDetails();

    } catch (error) {

      console.log(
        "Something went wrong. Please try again.",
        error.response?.data?.message || error.message
      );
    }
  };

  // Download
  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(
        new Blob([response.data])
      );

      const link = document.createElement("a");

      link.href = url;

      link.setAttribute(
        "download",
        "Expense_details.xlsx"
      );

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.log(
        "Something went wrong.",
        error.response?.data?.message || error.message
      );
    }
  };

  useEffect(() => {
    fetchExpenseDetails();

    return () => { };
  }, []);

  return (
    <DashboardLayout activeMenu="Expense">

      <div className="my-5 mx-auto">

        <div className="grid grid-cols-1 gap-6">

          <ExpenseOverview
            transactions={expenseData}
            onAddExpense={() => setOpenAddExpenseModal(true)}
          />

          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => deleteExpense(id)}
            onDownload={handleDownloadExpenseDetails}
          />
        </div>

        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Expense"
        >
          <AddExpense
            onAddExpense={handleAddExpense}
          />
        </Modal>

      </div>
    </DashboardLayout>
  );
};

export default Expense;