// src/components/Logout.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        padding: "8px 16px",
        backgroundColor: "#ef4444",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "bold",
        marginBottom: 20
      }}
    >
      Logout
    </button>
  );
}
