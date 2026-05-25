import React from "react";
import CustomPieChart from "../Charts/CustomPieChart";
const COLORS = ["#875CF5", "#6c080dff", "#FF6900"];

const FinanceOverview = ({ totalBalance, totalIncome, totalExpenses }) => {
  const balanceData = [
    {
      name: "Total Balance",
      amount: Math.max(totalBalance, 0),
    },
    {
      name: "Total Expenses",
      amount: Math.max(totalExpenses, 0),
    },
    {
      name: "Total Income",
      amount: Math.max(totalIncome, 0),
    },
  ];

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Financial Overview</h5>
      </div>

      <CustomPieChart
        data={balanceData}
        label="Total Balance"
        totalAmount={`$${totalBalance}`}
        colors={COLORS}
        showTextAnchor
      />
    </div>
  );
};

export default FinanceOverview;