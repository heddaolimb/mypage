import { useState } from "react";

export default function StockDashboard() {
  const [symbol, setSymbol] = useState("AAPL");
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:5000/stock?symbol=${symbol}`);
      const json = await res.json();
      setData(json);
      console.log(json);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      style={{ position: "relative", zIndex: 20 }}
    >
      <h4>Stock & Risk Analysis Dashboard</h4>

      <input
        type="text"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value.toUpperCase())}
        placeholder="Enter stock (e.g. AAPL)"
      />

      <button onClick={fetchData}>Fetch Data</button>

      <p>Check console for data</p>
    </div>
  );
}
