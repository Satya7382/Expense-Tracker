import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import IncomeOverview from "../../components/Income/IncomeOverview";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Modal from '../../components/Modal';
import AddIncomeForm from "../../components/Income/AddIncomeForm";
import { toast } from "react-hot-toast";
import IncomeList from "../../components/Income/IncomeList";
const Income = () => {

  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

  const fetchIncomeDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`
      );
      if (response.data) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.", error)
    } finally {
      setLoading(false);
    }
  };
  const handleAddIncome = async (income) => {
    try {
      const { source, amount, date, icon } = income;
      if (!source.trim()) {
        toast.error("Income source is required.");
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
        `${API_PATHS.INCOME.ADD_INCOME}`,
        {
          source,
          amount,
          date,
          icon,
        }
      );
      setOpenAddIncomeModal(false);
      toast.success("Income added successfully.");
      fetchIncomeDetails();
    } catch (error) {
      console.log("Something went wrong. Please try again.", error.response?.data?.message || error.message);
    }
  }
  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(
        API_PATHS.INCOME.DELETE_INCOME(id)
      );
      toast.success("Income deleted successfully.");
      fetchIncomeDetails();
    } catch (error) {
      console.log("Something went wrong. Please try again.", error.response?.data?.message || error.message);
    } finally {
      setOpenDeleteAlert({ show: false, data: null });
    }
  }
  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.INCOME.DOWNLOAD_INCOME,
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
        "income_details.xlsx"
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
    fetchIncomeDetails();
    return () => { };
  }, []);
  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>
          <IncomeList
            transactions={incomeData}
            onDelete={(id) => {
              deleteIncome(id);
            }}
            onDownload={handleDownloadIncomeDetails}
          />
        </div>
        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Income;