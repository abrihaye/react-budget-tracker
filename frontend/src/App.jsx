import {useState, useEffect} from 'react';

function App() {
  const [ledger, setLedger] = useState([]);

  const [newItem, setNewItem] = useState("");
  const [newAmount, setNewAmount] = useState("");

  const handleSave = async () => {

    if(!newItem || !newAmount) return;
    
    const entry = {description: newItem, amount: newAmount, id: crypto.randomUUID()};
    
    try {
      const response = await fetch('http://localhost:3000/budget', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(entry)
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      } else {
        setLedger([...ledger, entry]);
        setNewItem("");
        setNewAmount("");
      }

    } catch(error) {
      console.error(error.name, error.message);
    }

  };

  const handleDelete = async (itemId) => {
    // itemId is the transaction number to delete
    try {
      const response = await fetch('http://localhost:3000/budget', {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id: itemId})
      });

      if(!response.ok) {
        throw new Error('Response status : {response.status}');
      } else {
        setLedger(ledger.filter((entry) => entry.id != itemId));
      }
    } catch(error) {
      console.error(error.name, error.message);
    };

  };

  useEffect(() => {
    // Define an async function (Task)
    const fetchData = async () => {
      try {
        // 1. Send Request & Yield (Wait for Network)
        const response = await fetch('http://localhost:3000/budget');
        
        // 2. Parse JSON & Yield (Wait for CPU parsing)
        const data = await response.json();
        
        // 3. Update State (Back to main thread)
        console.log("Data received:", data);
        setLedger(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Kick off the task
    fetchData();
  }, []);

  return (
    <div className="app-container">
      <h1>Budget App</h1>

      <div style={{marginBottom: '20px'}}> 
        <input
          type="text"
          placeholder='Item Name'
          value={newItem} 
          onChange={(e) => setNewItem(e.target.value)}
        />
        <input
          type="text"
          placeholder='Item Amount'
          value={newAmount} 
          onChange={(e) => setNewAmount(e.target.value)}
        />
      </div>

      <button onClick={handleSave}>Add</button>

      {/* 3. Dump the memory to screen for debugging */}
      <ul> {ledger.map((entry, index) => (
        <li key={entry.id}>
          {entry.description}: <b>${entry.amount}</b>
          <button onClick={() => handleDelete(entry.id)}>Delete</button>
        </li>
      ))}
      </ul>
    </div>
  );
}

export default App;