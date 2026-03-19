import { useState } from "react";
import dynamic from "next/dynamic";

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
});

export default function StockDashboard() {
  const [symbols, setSymbols] = useState("AAPL,MSFT");
  const [data, setData] = useState({});

  const fetchData = async () => {
    const symbolList = symbols.split(",");
    const results = {};

    for (let sym of symbolList) {
      const res = await fetch(
        `http://127.0.0.1:5000/stock?symbol=${sym.trim()}`,
      );
      const json = await res.json();
      results[sym.trim()] = json;
    }

    setData(results);
  };

  // 🔥 MOVING AVERAGE
  const movingAverage = (data, windowSize) => {
    return data.map((_, i, arr) => {
      if (i < windowSize) return null;
      const slice = arr.slice(i - windowSize, i);
      return slice.reduce((sum, d) => sum + d.Close, 0) / windowSize;
    });
  };

  // 🔥 VOLATILITY
  const calculateVolatility = (data) => {
    const returns = [];

    for (let i = 1; i < data.length; i++) {
      returns.push((data[i].Close - data[i - 1].Close) / data[i - 1].Close);
    }

    const mean = returns.reduce((a, b) => a + b, 0) / returns.length;

    const variance =
      returns.reduce((sum, r) => sum + (r - mean) ** 2, 0) / returns.length;

    return Math.sqrt(variance) * Math.sqrt(252);
  };

  // 🔥 DRAWDOWN
  const calculateDrawdown = (data) => {
    let peak = data[0].Close;
    let maxDrawdown = 0;

    data.forEach((d) => {
      if (d.Close > peak) peak = d.Close;

      const dd = (d.Close - peak) / peak;

      if (dd < maxDrawdown) maxDrawdown = dd;
    });

    return maxDrawdown * 100;
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      style={{ position: "relative", zIndex: 20 }}
    >
      <h4>Stock & Risk Analysis Dashboard</h4>

      <input
        value={symbols}
        onChange={(e) => setSymbols(e.target.value.toUpperCase())}
        placeholder="AAPL, MSFT"
      />

      <button onClick={fetchData}>Fetch Data</button>

      {Object.keys(data).length > 0 && (
        <>
          {/* 📊 ANALYSIS PER STOCK */}
          {Object.entries(data).map(([sym, d]) => (
            <div key={sym}>
              <h4>{sym}</h4>

              <p>Latest: {d[d.length - 1]?.Close}</p>

              <p>
                Return:{" "}
                {(
                  ((d[d.length - 1].Close - d[0].Close) / d[0].Close) *
                  100
                ).toFixed(2)}
                %
              </p>

              <p>Volatility: {calculateVolatility(d).toFixed(4)}</p>

              <p>Drawdown: {calculateDrawdown(d).toFixed(2)}%</p>

              <Plot
                data={[
                  {
                    x: d.map((x) => x.Date),
                    y: d.map((x) => x.Close),
                    type: "scatter",
                    mode: "lines",
                    name: "Price",
                  },
                  {
                    x: d.map((x) => x.Date),
                    y: movingAverage(d, 50),
                    type: "scatter",
                    mode: "lines",
                    name: "MA50",
                  },
                ]}
                layout={{
                  width: 600,
                  height: 300,
                  title: `${sym}`,
                }}
              />
            </div>
          ))}

          {/* 💰 INVESTMENT */}
          <h4>If you invested $10,000:</h4>

          {Object.entries(data).map(([sym, d]) => {
            const value = (10000 * d[d.length - 1].Close) / d[0].Close;

            return (
              <p key={sym}>
                {sym}: ${value.toFixed(2)}
              </p>
            );
          })}

          {/* 📈 COMPARISON */}
          <Plot
            data={Object.entries(data).map(([sym, d]) => ({
              x: d.map((x) => x.Date),
              y: d.map((x) => x.Close),
              type: "scatter",
              mode: "lines",
              name: sym,
            }))}
            layout={{
              width: 700,
              height: 400,
              title: "Comparison",
            }}
          />
        </>
      )}
    </div>
  );
}
