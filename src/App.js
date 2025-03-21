import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [aircrafts, setAircrafts] = useState([]);
  const [weightData, setWeightData] = useState(null);

  useEffect(() => {
    axios.get('https://your-backend-url.onrender.com/aircraft/')
      .then((res) => setAircrafts(res.data))
      .catch(console.error);
  }, []);

  const checkWeight = (id) => {
    axios.get(`https://your-backend-url.onrender.com/aircraft/${id}/weight_balance`)
      .then((res) => setWeightData(res.data))
      .catch(console.error);
  };

  return (
    <div>
      <h1>Military Load Planner</h1>
      <select onChange={(e) => checkWeight(e.target.value)}>
        <option>Select Aircraft</option>
        {aircrafts.map((a) => (
          <option key={a.id} value={a.id}>{a.name}</option>
        ))}
      </select>

      {weightData && (
        <div>
          <h2>Weight & Balance</h2>
          <p>Total Cargo Weight: {weightData.total_cargo_weight} kg</p>
          <p>Total Personnel Weight: {weightData.total_personnel_weight} kg</p>
          <p>Total Weight: {weightData.total_weight} kg</p>
          <p>Status: {weightData.within_limits ? 'Within Limits ✅' : 'Too Heavy ❌'}</p>
        </div>
      )}
    </div>
  );
}

export default App;
