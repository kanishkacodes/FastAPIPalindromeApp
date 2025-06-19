import { useState } from 'react';
import PalindromeForm from './components/PalindromeForm';
import HistoryTable from './components/HistoryTable';

function App() {
  const [lastCheck, setLastCheck] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <PalindromeForm onResult={setLastCheck} />
      <HistoryTable refresh={lastCheck} />
    </div>
  );
}

export default App;
