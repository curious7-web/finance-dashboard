import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { collection, getDocs, addDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const TransactionContext = createContext();

export function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchTransactions(currentUser.uid);
      } else {
        setTransactions([]);
      }
    });
    return () => unsubscribeAuth();
  }, []);

  const fetchTransactions = async (uid) => {
    try {
      const snapshot = await getDocs(collection(db, `users/${uid}/transactions`));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTransactions(data);
    } catch (error) {
      console.error("Fetch transactions failed:", error);
    }
  };

  const addTransaction = async (transaction) => {
    if (!user) return;
    try {
      const newTransaction = { ...transaction, createdAt: serverTimestamp() };
      const docRef = await addDoc(collection(db, `users/${user.uid}/transactions`), newTransaction);
      setTransactions((prev) => [...prev, { ...transaction, id: docRef.id }]);
    } catch (error) {
      console.error("Add transaction failed:", error);
    }
  };

  const resetTransactions = async () => {
    if (!user) return;
    try {
      const promises = transactions.map((t) => deleteDoc(doc(db, `users/${user.uid}/transactions`, t.id)));
      await Promise.all(promises);
      setTransactions([]);
    } catch (error) {
      console.error("Reset failed:", error);
    }
  };

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction, resetTransactions }}>
      {children}
    </TransactionContext.Provider>
  );
}

export const useTransactions = () => useContext(TransactionContext);
