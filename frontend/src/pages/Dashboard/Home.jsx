import React, { useEffect } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import useUserAuth from '../../hooks/useUserAuth'
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import { addThousandsSeparator } from '../../utils/helper';
import { IoMdCard } from 'react-icons/io';
import InfoCard from '../../components/Cards/InfoCard';
import { LuHandCoins, LuWalletMinimal } from 'react-icons/lu';
import RecentTransactions from '../../components/Dashboardfun/RecentTransactions';
import FinanceOverview from '../../components/Dashboardfun/FinanceOverview';
import ExpenseTransactions from '../../components/Dashboardfun/ExpenseTransactions';
import IncomeTransactions from '../../components/Dashboardfun/IncomeTransactions';
const Home = () => {
  useUserAuth(); // Custom hook to check user authentication
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return; // Prevent multiple requests
    setLoading(true);
    try {
      const response = await axiosInstance.get(`${API_PATHS.DASHBOARD.GET_DATA}`);
      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    return () => { };
  }, []);
  return (
    <DashboardLayout activeMenu="Dashboard">
      <div>
        <div className="my-5 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InfoCard
              icon={<IoMdCard />}
              label="Total Balance"
              value={addThousandsSeparator(dashboardData?.totalBalance ?? 0)}
              color="bg-primary"
            />

            <InfoCard
              icon={<LuWalletMinimal />}
              label="Total Income"
              value={addThousandsSeparator(dashboardData?.totalIncome ?? 0)}
              color="bg-primary"
            />

            <InfoCard
              icon={<LuHandCoins />}
              label="Total Expense"
              value={addThousandsSeparator(dashboardData?.totalExpenses ?? 0)}
              color="bg-primary"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <RecentTransactions
            transactions={dashboardData?.recentTransactions}
          />
          <FinanceOverview
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpenses={dashboardData?.totalExpenses || 0}
          />
          <IncomeTransactions
            transactions={dashboardData?.last60DaysIncome?.transactions || []}
            onSeeMore={() => navigate("/income")}
          />
          <ExpenseTransactions
            transactions={dashboardData?.last30DaysExpenses?.transactions || []}
            onSeeMore={() => navigate("/expense")}
          />
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Home;