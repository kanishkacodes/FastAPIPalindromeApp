import { useState } from 'react';
import api from '../services/api';

const PalindromeForm = ({ onResult }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheck = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/palindrome', { text: input });
      onResult(res.data);  // pass result up to App.jsx
      setInput('');
    } catch (err) {
      setError(err.response?.data?.detail || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-6 bg-white shadow rounded-md">
      <h1 className="text-2xl font-bold mb-4 text-blue-600">🔁 Palindrome Checker</h1>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          className="flex-1 px-4 py-2 border rounded"
          placeholder="Enter text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={handleCheck}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Checking...' : 'Check'}
        </button>
      </div>
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
};

export default PalindromeForm;
