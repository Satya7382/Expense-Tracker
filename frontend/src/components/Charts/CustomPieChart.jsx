import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const CustomPieChart = ({
  data = [],
  label = "",
  totalAmount = 0,
  colors = [],
  showCenterText = false,
}) => {
  return (
    <ResponsiveContainer width="100%" height={380}>
      <PieChart>
        <Pie
          data={data}
          dataKey="amount"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={130}
          innerRadius={100}
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell
              key={`slice-${index}`}
              fill={colors[index % colors.length]}
            />
          ))}
        </Pie>

        <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
        <Legend verticalAlign="bottom" height={36} />

        {showCenterText && (
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            <tspan
              x="50%"
              dy="-8"
              fontSize="14"
              fill="#6b7280"
            >
              {label}
            </tspan>

            <tspan
              x="50%"
              dy="28"
              fontSize="22"
              fontWeight="600"
              fill="#111827"
            >
              ${totalAmount}
            </tspan>
          </text>
        )}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;