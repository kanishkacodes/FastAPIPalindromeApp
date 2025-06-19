import api from '../services/api';
import { useEffect, useState } from 'react';

const HistoryTable = ({ refresh }) => {
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    try {
      const res = await api.get('/history?limit=5');
      setHistory(res.data);
    } catch (err) {
      console.error('Error fetching history:', err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [refresh]);  // auto refresh when result changes

  return (
    <div className="w-full max-w-3xl mx-auto mt-10 bg-white p-4 shadow rounded-md">
      <h2 className="text-xl font-semibold mb-3 text-gray-800">🕒 Recent Checks</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-2">Input</th>
              <th className="px-4 py-2">Result</th>
              <th className="px-4 py-2">Time</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item) => (
              <tr key={item._id} className="border-t">
                <td className="px-4 py-2">{item.input}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                    item.isPalindrome ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                  }`}>
                    {item.isPalindrome ? 'Palindrome' : 'Not'}
                  </span>
                </td>
                <td className="px-4 py-2">{new Date(item.timestamp).toLocaleString()}</td>
              </tr>
            ))}
            {history.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center text-gray-500 py-4">No history found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryTable;
