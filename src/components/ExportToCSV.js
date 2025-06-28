import React from "react";
import { Button } from "@mui/material";

const ExportToCSV = ({ transactions }) => {
  const handleExport = () => {
    const headers = ["Type", "Category", "Amount", "Description"];
    const rows = transactions.map((t) =>
      [t.type, t.category, t.amount, t.description].join(",")
    );

    const csvContent = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button variant="outlined" color="secondary" onClick={handleExport}>
      Export to CSV
    </Button>
  );
};

export default ExportToCSV;
