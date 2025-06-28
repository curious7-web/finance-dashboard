import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = ({ transactions = [], isDarkMode = false, pieSmall = false }) => {
  // Ensure transactions is an array
  const safeTransactions = Array.isArray(transactions) ? transactions : [];

  // Aggregate amounts by category
  const categoryMap = safeTransactions.reduce((acc, curr) => {
    const cat = curr.category || "Uncategorized";
    acc[cat] = (acc[cat] || 0) + (curr.amount || 0);
    return acc;
  }, {});

  const labels = Object.keys(categoryMap);
  const data = Object.values(categoryMap);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Expenses by Category",
        data,
        backgroundColor: [
          "#1976d2",
          "#dc004e",
          "#ff9800",
          "#4caf50",
          "#9c27b0",
          "#ff5722",
          "#607d8b",
          "#795548",
          "#03a9f4",
          "#e91e63",
          "#673ab7",
          "#009688",
          "#cddc39",
          "#f44336",
          "#00bcd4",
          "#8bc34a",
          "#ffeb3b",
          "#3f51b5",
          "#ffc107",
          "#2196f3",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color: isDarkMode ? "#e0e0e0" : "#121212",
          font: { size: pieSmall ? 10 : 14 },
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div style={{ height: pieSmall ? 250 : 400, width: "100%" }}>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default Chart;
