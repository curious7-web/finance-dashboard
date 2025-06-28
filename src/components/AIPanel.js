// src/components/AIPanel.js
import React, { useMemo } from "react";
import { Paper, Typography, Divider, Box } from "@mui/material";

const AIPanel = ({ transactions = [], selectedCurrency = "USD", darkMode = false }) => {
  // Summarize expenses by category
  const expenseByCategory = useMemo(() => {
    const catMap = {};
    transactions.forEach((t) => {
      if (t.type === "expense") {
        catMap[t.category] = (catMap[t.category] || 0) + t.amount;
      }
    });
    return catMap;
  }, [transactions]);

  // Calculate total income and expense
  const totalIncome = useMemo(() => 
    transactions.filter(t => t.type === "income").reduce((acc, t) => acc + t.amount, 0)
  , [transactions]);

  const totalExpense = useMemo(() => 
    transactions.filter(t => t.type === "expense").reduce((acc, t) => acc + t.amount, 0)
  , [transactions]);

  // Determine top spending category
  const topCategory = useMemo(() => {
    const entries = Object.entries(expenseByCategory);
    if (entries.length === 0) return null;
    entries.sort((a, b) => b[1] - a[1]);
    return entries[0];
  }, [expenseByCategory]);

  // Premium colors
  const bgColor = darkMode ? "#222831" : "#f4f6f8";
  const textPrimary = darkMode ? "#ececec" : "#1a1a1a";
  const accent = "#00adb5";

  return (
    <Paper
      elevation={8}
      sx={{
        p: 3,
        height: "100%",
        backgroundColor: bgColor,
        color: textPrimary,
        borderRadius: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        boxShadow: `0 8px 16px rgba(0, 173, 181, 0.25)`,
        overflowY: "auto",
      }}
    >
      <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: accent }}>
        AI Insights
      </Typography>

      {!transactions.length ? (
        <Typography sx={{ mt: 2, fontStyle: "italic" }}>
          No transactions yet. Add some to see insights.
        </Typography>
      ) : (
        <>
          <Box mb={2}>
            <Typography variant="body1">
              Total Income: <strong>{selectedCurrency} {totalIncome.toFixed(2)}</strong>
            </Typography>
            <Typography variant="body1" color="error" fontWeight="bold">
              Total Expense: {selectedCurrency} {totalExpense.toFixed(2)}
            </Typography>
            <Divider sx={{ my: 2, borderColor: accent }} />
          </Box>

          <Box>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1, color: accent }}>
              Top Spending Category:
            </Typography>
            {topCategory ? (
              <Typography variant="body2" sx={{ mb: 3 }}>
                <strong>{topCategory[0]}</strong> — {selectedCurrency} {topCategory[1].toFixed(2)}
              </Typography>
            ) : (
              <Typography variant="body2" sx={{ mb: 3 }}>
                No expenses yet.
              </Typography>
            )}
          </Box>

          <Box>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1, color: accent }}>
              Spending Breakdown:
            </Typography>
            {Object.entries(expenseByCategory).length === 0 && (
              <Typography variant="body2" fontStyle="italic">
                No expense categories to display.
              </Typography>
            )}
            {Object.entries(expenseByCategory).map(([category, amount]) => (
              <Box
                key={category}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 0.8,
                  borderRadius: 1,
                  p: 1,
                  backgroundColor: darkMode ? "#393e46" : "#e0f7fa",
                  boxShadow: `inset 0 0 8px ${accent}`,
                }}
              >
                <Typography variant="body2">{category}</Typography>
                <Typography variant="body2" fontWeight="bold">
                  {selectedCurrency} {amount.toFixed(2)}
                </Typography>
              </Box>
            ))}
          </Box>
        </>
      )}
    </Paper>
  );
};

export default AIPanel;
