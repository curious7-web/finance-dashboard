import React, { useEffect, useState } from "react";
import { Typography, Box, Paper, CircularProgress } from "@mui/material";

const Insights = ({ user, transactions }) => {
  const [aiInsights, setAiInsights] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user || !transactions || transactions.length === 0) {
      setAiInsights("");
      return;
    }

    const fetchInsights = async () => {
      setLoading(true);
      setError(null);

      const inputText = transactions
        .slice(0, 10)
        .map((tx) => {
          const clean = `${tx.category || ""}: ${tx.description || ""}`;
          return clean.replace(/[^\w\s.,₹$€£¥]/g, "").trim();
        })
        .filter(Boolean)
        .join(". ");

      if (!inputText.trim()) {
        setAiInsights("No meaningful transaction data to analyze.");
        setLoading(false);
        return;
      }

      const apiUrl = process.env.REACT_APP_AI_API;

      if (!apiUrl) {
        setError("AI API URL not configured. Please check .env file.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ inputText }),
        });

        if (!response.ok) {
          const errText = await response.text();
          throw new Error(`API error: ${response.status} - ${errText}`);
        }

        const data = await response.json();
        setAiInsights(data.insights || "No insights could be generated.");
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to fetch AI insights. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, [user, transactions]);

  if (!user) {
    return (
      <Typography sx={{ mt: 5, textAlign: "center" }} variant="h6">
        Please login to view AI Insights.
      </Typography>
    );
  }

  if (loading) {
    return (
      <Box sx={{ mt: 5, textAlign: "center" }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Loading AI insights...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Typography sx={{ mt: 5, textAlign: "center", color: "error.main" }} variant="h6">
        {error}
      </Typography>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 900, mx: "auto" }}>
      <Paper
        elevation={6}
        sx={{
          p: 4,
          bgcolor: "background.paper",
          borderRadius: 3,
          boxShadow: "0 0 20px #1976d2",
          color: "text.primary",
          fontFamily: "Poppins, sans-serif",
          minHeight: 300,
          maxHeight: 500,
          overflowY: "auto",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "bold", mb: 3, textDecoration: "underline" }}
        >
          AI Insights
        </Typography>

        {aiInsights ? (
          <Typography
            variant="body1"
            sx={{
              fontSize: "1.1rem",
              lineHeight: 1.6,
              whiteSpace: "pre-line",
              wordBreak: "break-word",
            }}
          >
            {aiInsights}
          </Typography>
        ) : (
          <Typography variant="body1" sx={{ fontStyle: "italic" }}>
            No transactions to analyze yet.
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default Insights;
