// src/components/Transactions.js
import React, { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "transactions"), orderBy("date", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTransactions(data);
    });
    return unsubscribe;
  }, []);

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Transactions
      </Typography>
      <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
        <Table stickyHeader size="small" aria-label="transactions table">
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>Category</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map(t => (
              <TableRow key={t.id}>
                <TableCell>{t.description}</TableCell>
                <TableCell>{t.category}</TableCell>
                <TableCell align="right" sx={{ color: t.type === "expense" ? "error.main" : "success.main" }}>
                  {t.type === "expense" ? "-" : "+"}${t.amount.toFixed(2)}
                </TableCell>
                <TableCell>{t.type}</TableCell>
                <TableCell>{new Date(t.date).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
