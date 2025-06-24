import React from 'react';
import Logout from './Logout';

export default function Dashboard({ user }) {
  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <Logout />
      <h1>Welcome, {user.email}</h1>
      {/* Paste your transactions + form UI here or import from another file */}
    </div>
  );
}
