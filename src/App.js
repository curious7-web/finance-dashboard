import React, { useState, useEffect } from 'react';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/transactions')
      .then(res => res.json())
      .then(data => {
        setTransactions(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching transactions:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1>AI-Powered Personal Finance Dashboard</h1>

      {loading ? (
        <p>Loading transactions...</p>
      ) : (
        <>
          {transactions.length === 0 ? (
            <p>No transactions yet.</p>
          ) : (
            <ul>
              {transactions.map(tx => (
                <li key={tx._id}>
                  <strong>{tx.type.toUpperCase()}</strong>: {tx.category} — ${tx.amount} on {new Date(tx.date).toLocaleDateString()}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}

export default App;
