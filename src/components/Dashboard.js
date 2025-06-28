import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase";

import AddTransaction from "./AddTransaction";
import PieChart from "./PieChart";
import BarChart from "./BarChart";
import AIPanel from "./AIPanel";
import ExportToCSV from "./ExportToCSV"; // ✅ new import

import {
  Typography,
  Box,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
} from "@mui/material";

const categories = [
  "Food & Dining",
  "Transportation",
  "Utilities",
  "Health & Fitness",
  "Entertainment",
  "Shopping",
  "Travel",
  "Education",
  "Bills & Subscriptions",
  "Groceries",
  "Personal Care",
  "Gifts & Donations",
  "Housing",
  "Taxes",
  "Savings",
  "Miscellaneous",
];

const currencies = ["USD", "EUR", "GBP", "NPR", "INR"];

const Dashboard = ({ user, darkMode }) => {
  const [transactions, setTransactions] = useState([]);
  const [currency, setCurrency] = useState("USD");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      setTransactions([]);
      return;
    }
    fetchTransactions();
  }, [user]);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const colRef = collection(db, `users/${user.uid}/transactions`);
      const q = query(colRef, orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt ? doc.data().createdAt.toDate() : new Date(),
      }));
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
    setLoading(false);
  };

  const handleAddTransaction = async (transaction) => {
    if (!user) {
      alert("Please login to add transactions");
      return;
    }
    try {
      const colRef = collection(db, `users/${user.uid}/transactions`);
      const newTransaction = {
        ...transaction,
        createdAt: serverTimestamp(),
        currency,
      };
      const docRef = await addDoc(colRef, newTransaction);
      setTransactions((prev) => [
        { ...transaction, id: docRef.id, createdAt: new Date(), currency },
        ...prev,
      ]);
    } catch (error) {
      console.error("Error adding transaction:", error);
      alert("Failed to add transaction.");
    }
  };

  const handleReset = async () => {
    if (!user) return;
    if (!window.confirm("Are you sure you want to delete all transactions?")) return;

    try {
      setLoading(true);
      const colRef = collection(db, `users/${user.uid}/transactions`);
      const snapshot = await getDocs(colRef);
      const deletes = snapshot.docs.map((docSnap) =>
        deleteDoc(doc(db, `users/${user.uid}/transactions`, docSnap.id))
      );
      await Promise.all(deletes);
      setTransactions([]);
      setLoading(false);
    } catch (error) {
      console.error("Error deleting transactions:", error);
      setLoading(false);
    }
  };

  const displayName = user?.displayName || user?.email || "User";

  return (
    <Box sx={{ p: 3, minHeight: "calc(100vh - 56px)", maxWidth: 1100, mx: "auto" }}>
      <Typography
        variant="h3"
        sx={{
          fontWeight: "bold",
          color: darkMode ? "#e0e0e0" : "#121212",
          mb: 2,
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        Welcome, {displayName}
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <FormControl sx={{ minWidth: 140 }}>
          <InputLabel id="currency-label">Currency</InputLabel>
          <Select
            labelId="currency-label"
            label="Currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            size="small"
          >
            {currencies.map((cur) => (
              <MenuItem key={cur} value={cur}>
                {cur}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ display: "flex", gap: 2 }}>
          <ExportToCSV data={transactions} fileName="transactions.csv" />
          <Button variant="outlined" color="error" onClick={handleReset} disabled={loading}>
            Reset All Transactions
          </Button>
        </Box>
      </Box>

      <AddTransaction
        onAdd={handleAddTransaction}
        categories={categories}
        currency={currency}
      />

      <Box
        sx={{
          display: "flex",
          gap: 3,
          mt: 4,
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <Paper
          elevation={8}
          sx={{
            flex: 1,
            minWidth: 300,
            maxWidth: 600,
            p: 3,
            borderRadius: 4,
            bgcolor: darkMode ? "#121212" : "#fff",
          }}
        >
          <PieChart transactions={transactions} darkMode={darkMode} currency={currency} />
        </Paper>

        <Paper
          elevation={8}
          sx={{
            flex: 1,
            minWidth: 300,
            maxWidth: 600,
            p: 3,
            borderRadius: 4,
            bgcolor: darkMode ? "#121212" : "#fff",
          }}
        >
          <BarChart transactions={transactions} darkMode={darkMode} currency={currency} />
        </Paper>
      </Box>

      <Box sx={{ mt: 5 }}>
        <AIPanel transactions={transactions} currency={currency} darkMode={darkMode} />
      </Box>
    </Box>
  );
};

export default Dashboard;
