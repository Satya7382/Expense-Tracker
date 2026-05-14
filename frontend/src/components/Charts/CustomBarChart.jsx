import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const CustomBarChart = ({
  data = [],
  xAxisKey = "date",
  barKey = "amount",
}) => {
  return (
    <ResponsiveContainer width="100%" height={380}>
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 20,
          left: 0,
          bottom: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis
          dataKey={xAxisKey}
          tick={{ fontSize: 12 }}
        />

        <YAxis tick={{ fontSize: 12 }} />

        <Tooltip
          formatter={(value) => [`$${value}`, "Income"]}
        />

        <Bar
          dataKey={barKey}
          fill="#875cf5"
          radius={[10, 10, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomBarChart;