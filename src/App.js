import React, { useState, useEffect } from 'react';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [type, setType] = useState('income');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = () => {
    setLoading(true);
    fetch('http://localhost:5000/api/transactions')
      .then(res => res.json())
      .then(data => {
        setTransactions(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching transactions:', err);
        setTransactions([]);
        setLoading(false);
      });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!amount || !category) {
      alert('Please enter amount and category');
      return;
    }
    const newTransaction = {
      type,
      amount: Number(amount),
      category,
      description,
    };
    fetch('http://localhost:5000/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTransaction),
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to add transaction');
        return res.json();
      })
      .then(() => {
        setAmount('');
        setCategory('');
        setDescription('');
        fetchTransactions();
      })
      .catch(err => alert(err.message));
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1>AI-Powered Personal Finance Dashboard</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <label>
          Type:{' '}
          <select value={type} onChange={e => setType(e.target.value)}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </label>{' '}
        <label>
          Amount:{' '}
          <input
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            required
          />
        </label>{' '}
        <label>
          Category:{' '}
          <input
            type="text"
            value={category}
            onChange={e => setCategory(e.target.value)}
            required
          />
        </label>{' '}
        <label>
          Description:{' '}
          <input
            type="text"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </label>{' '}
        <button type="submit">Add Transaction</button>
      </form>

      {loading ? (
        <p>Loading transactions...</p>
      ) : transactions.length === 0 ? (
        <p>No transactions yet.</p>
      ) : (
        <ul>
          {transactions.map(tx => (
            <li key={tx._id}>
              <strong>{tx.type.toUpperCase()}</strong>: {tx.category} — ${tx.amount} on{' '}
              {new Date(tx.date).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
