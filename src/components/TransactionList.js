// src/components/TransactionList.js
import React from "react";
import { useTransactions } from "../contexts/TransactionContext";
import { List, ListItem, ListItemText, Typography } from "@mui/material";

const TransactionList = () => {
  const { transactions } = useTransactions();

  if (!transactions.length) {
    return <Typography>No transactions available.</Typography>;
  }

  return (
    <List>
      {transactions.map(({ id, type, category, amount, date }) => (
        <ListItem key={id} divider>
          <ListItemText
            primary={`${type.toUpperCase()} - ${category}`}
            secondary={`Amount: ${amount} | Date: ${new Date(date).toLocaleDateString()}`}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default TransactionList;
