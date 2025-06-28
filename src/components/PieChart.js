import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Typography } from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);

const colors = [
  "#6a0dad",
  "#ff6f61",
  "#6b5b95",
  "#feb236",
  "#d64161",
  "#ff7b25",
  "#45b8ac",
  "#e0b0ff",
  "#ffa07a",
  "#20b2aa",
  "#87cefa",
];

const PieChart = ({ transactions, darkMode, currency }) => {
  const expenseTxns = transactions.filter((t) => t.type === "expense");

  const categoryTotals = expenseTxns.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});

  const labels = Object.keys(categoryTotals);
  const dataValues = Object.values(categoryTotals);

  const data = {
    labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: colors.slice(0, labels.length),
        borderColor: darkMode ? "#1e1e1e" : "#fff",
        borderWidth: 2,
        hoverOffset: 25,
        shadowOffsetX: 5,
        shadowOffsetY: 5,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const amount = context.parsed;
            return `${context.label}: ${currency} ${amount.toLocaleString()}`;
          },
        },
      },
      legend: {
        labels: {
          color: darkMode ? "#ddd" : "#333",
          font: {
            size: 14,
            family: "'Poppins', sans-serif",
          },
        },
      },
    },
  };

  if (labels.length === 0) {
    return (
      <Typography variant="body1" align="center" color="text.secondary">
        No expense transactions to display.
      </Typography>
    );
  }

  return <Pie data={data} options={options} />;
};

export default PieChart;
