import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

export default function Logout() {
  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <button onClick={handleLogout} style={{ padding: 8, marginBottom: 20 }}>
      Logout
    </button>
  );
}
