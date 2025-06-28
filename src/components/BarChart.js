import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Typography } from "@mui/material";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const BarChart = ({ transactions, darkMode, currency }) => {
  const monthlyTotals = {};

  monthNames.forEach((m) => {
    monthlyTotals[m] = { income: 0, expense: 0 };
  });

  transactions.forEach((t) => {
    const date = t.createdAt instanceof Date ? t.createdAt : new Date();
    const month = monthNames[date.getMonth()];
    if (t.type === "income" || t.type === "expense") {
      monthlyTotals[month][t.type] += t.amount;
    }
  });

  const data = {
    labels: monthNames,
    datasets: [
      {
        label: "Income",
        data: monthNames.map((m) => monthlyTotals[m].income),
        backgroundColor: "#4caf50",
        borderRadius: 6,
      },
      {
        label: "Expense",
        data: monthNames.map((m) => monthlyTotals[m].expense),
        backgroundColor: "#f44336",
        borderRadius: 6,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${currency} ${context.parsed.y.toLocaleString()}`;
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
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: darkMode ? "#ddd" : "#555",
          font: {
            family: "'Poppins', sans-serif",
          },
          callback: (value) => `${currency} ${value}`,
        },
        grid: {
          color: darkMode ? "#444" : "#eee",
        },
      },
      x: {
        ticks: {
          color: darkMode ? "#ddd" : "#555",
          font: {
            family: "'Poppins', sans-serif",
          },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  if (transactions.length === 0) {
    return (
      <Typography variant="body1" align="center" color="text.secondary">
        No transactions to display.
      </Typography>
    );
  }

  return <Bar data={data} options={options} />;
};

export default BarChart;
