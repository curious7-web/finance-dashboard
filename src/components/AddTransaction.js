import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Grid,
  FormControl,
  InputLabel,
  Select,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";

const categories = [
  "Food",
  "Rent",
  "Salary",
  "Entertainment",
  "Transport",
  "Health",
  "Other",
];

const AddTransaction = ({ onAdd, currency }) => {
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [loadingPrediction, setLoadingPrediction] = useState(false);

  // Predict category when description changes
  useEffect(() => {
    const predictCategory = async () => {
      if (description.length < 3) return;

      try {
        setLoadingPrediction(true);

        const response = await fetch("https://api-inference.huggingface.co/models/finiteautomata/bertweet-base-sentiment-analysis", {
          method: "POST",
          headers: {
            Authorization: process.env.HUGGINGFACE_TOKEN,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ inputs: description }),
        });

        const result = await response.json();

        if (result && Array.isArray(result)) {
          const label = result[0][0]?.label?.toLowerCase();

          // Match a similar category from the list
          const matched = categories.find((cat) =>
            label.includes(cat.toLowerCase())
          );

          if (matched) setCategory(matched);
        }
      } catch (err) {
        console.error("Prediction failed:", err);
      } finally {
        setLoadingPrediction(false);
      }
    };

    predictCategory();
  }, [description]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !category) return;

    const newTransaction = {
      type,
      category,
      amount: parseFloat(amount),
      description,
    };

    onAdd(newTransaction);
    setAmount("");
    setCategory("");
    setDescription("");
  };

  return (
    <Paper sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Add New Transaction
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select value={type} label="Type" onChange={(e) => setType(e.target.value)}>
                <MenuItem value="income">Income</MenuItem>
                <MenuItem value="expense">Expense</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel>Category {loadingPrediction ? "(predicting...)" : ""}</InputLabel>
              <Select
                value={category}
                label="Category"
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              label={`Amount (${currency})`}
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              fullWidth
              inputProps={{ min: 0, step: "0.01" }}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} textAlign="right">
            <Button type="submit" variant="contained" color="primary">
              Add Transaction
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default AddTransaction;
