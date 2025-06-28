import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { AuthProvider } from "./contexts/AuthContext";
import { TransactionProvider } from "./contexts/TransactionContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <TransactionProvider>
        <App />
      </TransactionProvider>
    </AuthProvider>
  </React.StrictMode>
);
