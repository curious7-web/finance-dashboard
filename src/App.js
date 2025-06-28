import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase"; // assuming you export db from firebase.js
import { collection, getDocs, query, orderBy } from "firebase/firestore";

import Navbar from "./components/Navbar";
import BottomNav from "./components/BottomNav";

import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import Insights from "./components/Insights";
import Login from "./components/Login";
import Signup from "./components/Signup";

import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const AppWrapper = () => {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [loadingTransactions, setLoadingTransactions] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchTransactions(currentUser.uid);
      } else {
        setTransactions([]);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchTransactions = async (uid) => {
    setLoadingTransactions(true);
    try {
      const colRef = collection(db, `users/${uid}/transactions`);
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
    setLoadingTransactions(false);
  };

  // Pass this setter so Dashboard can update transactions on add/reset
  const setTransactionsAndRefetch = (newTransactions) => {
    setTransactions(newTransactions);
  };

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      background: {
        default: darkMode ? "#121212" : "#fafafa",
        paper: darkMode ? "#1e1e1e" : "#fff",
      },
      text: {
        primary: darkMode ? "#e0e0e0" : "#121212",
        secondary: darkMode ? "#b0b0b0" : "#555555",
      },
      primary: {
        main: "#1976d2",
      },
    },
    typography: {
      fontFamily: "Poppins, sans-serif",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar user={user} setUser={setUser} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                user={user}
                darkMode={darkMode}
                transactions={transactions}
                setTransactions={setTransactionsAndRefetch}
                loadingTransactions={loadingTransactions}
              />
            }
          />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/insights" element={<Insights user={user} transactions={transactions} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup setUser={setUser} />} />
        </Routes>
        <BottomNav user={user} />
      </Router>
    </ThemeProvider>
  );
};

export default AppWrapper;
