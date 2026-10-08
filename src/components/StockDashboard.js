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
        `https://stock-backend-5aj5.onrender.com/stock?symbol=${sym.trim()}`,
      );
      const json = await res.json();
      results[sym.trim()] = json;
    }

    setData(results);
  };

  // MOVING AVERAGE
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

  // DRAWDOWN
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
      style={{
        position: "relative",
        zIndex: 20,
        padding: "10px",
        fontFamily: "inherit",
      }}
    >
      <h4
        style={{
          marginBottom: "18px",
          fontSize: "20px",
        }}
      >
        Stock & Risk Analysis Dashboard
      </h4>

      {/* SEARCH / CONTROLS */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          marginBottom: "25px",
          flexWrap: "wrap",
        }}
      >
        <input
          value={symbols}
          onChange={(e) => setSymbols(e.target.value.toUpperCase())}
          placeholder="AAPL, MSFT"
          style={{
            padding: "11px 14px",
            borderRadius: "8px",
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(255,255,255,0.06)",
            color: "inherit",
            outline: "none",
            fontSize: "14px",
            minWidth: "180px",
          }}
        />

        <button
          onClick={fetchData}
          style={{
            padding: "11px 20px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "14px",
            background: "rgba(255,255,255,0.12)",
            color: "inherit",
            transition: "all 0.2s ease",
          }}
        >
          Fetch Data
        </button>
      </div>

      {Object.keys(data).length > 0 && (
        <>
          {/* ANALYSIS PER STOCK */}
          {Object.entries(data).map(([sym, d]) => {
            const latest = d[d.length - 1]?.Close;
            const returnValue =
              ((d[d.length - 1].Close - d[0].Close) / d[0].Close) * 100;
            const volatility = calculateVolatility(d) * 100;
            const drawdown = calculateDrawdown(d);

            return (
              <div
                key={sym}
                style={{
                  marginBottom: "35px",
                }}
              >
                <h4
                  style={{
                    fontSize: "18px",
                    marginBottom: "14px",
                  }}
                >
                  {sym}
                </h4>

                {/* STAT CARDS */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
                    gap: "10px",
                    marginBottom: "20px",
                  }}
                >
                  {/* LATEST */}
                  <div
                    style={{
                      padding: "14px",
                      borderRadius: "10px",
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "11px",
                        opacity: 0.6,
                        marginBottom: "6px",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      Latest
                    </div>

                    <div
                      style={{
                        fontSize: "18px",
                        fontWeight: "600",
                      }}
                    >
                      ${latest?.toFixed(2)}
                    </div>
                  </div>

                  {/* RETURN */}
                  <div
                    style={{
                      padding: "14px",
                      borderRadius: "10px",
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "11px",
                        opacity: 0.6,
                        marginBottom: "6px",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      Return
                    </div>

                    <div
                      style={{
                        fontSize: "18px",
                        fontWeight: "600",
                      }}
                    >
                      {returnValue >= 0 ? "+" : ""}
                      {returnValue.toFixed(2)}%
                    </div>
                  </div>

                  {/* VOLATILITY */}
                  <div
                    style={{
                      padding: "14px",
                      borderRadius: "10px",
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "11px",
                        opacity: 0.6,
                        marginBottom: "6px",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      Volatility
                    </div>

                    <div
                      style={{
                        fontSize: "18px",
                        fontWeight: "600",
                      }}
                    >
                      {volatility.toFixed(2)}%
                    </div>
                  </div>

                  {/* DRAWDOWN */}
                  <div
                    style={{
                      padding: "14px",
                      borderRadius: "10px",
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "11px",
                        opacity: 0.6,
                        marginBottom: "6px",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      Drawdown
                    </div>

                    <div
                      style={{
                        fontSize: "18px",
                        fontWeight: "600",
                      }}
                    >
                      {drawdown.toFixed(2)}%
                    </div>
                  </div>
                </div>

                {/* stock graph*/}
                <div
                  style={{
                    width: "100%",
                    overflowX: "auto",
                    borderRadius: "12px",
                    background: "rgba(255,255,255,0.025)",
                    padding: "8px",
                  }}
                >
                  <Plot
                    data={[
                      {
                        x: d.map((x) => x.Date),
                        y: d.map((x) => x.Close),
                        type: "scatter",
                        mode: "lines",
                        name: "Price",
                        line: {
                          width: 2,
                        },
                      },
                      {
                        x: d.map((x) => x.Date),
                        y: movingAverage(d, 50),
                        type: "scatter",
                        mode: "lines",
                        name: "MA50",
                        line: {
                          width: 1.5,
                          dash: "dot",
                        },
                      },
                    ]}
                    layout={{
                      width: 600,
                      height: 300,
                      title: {
                        text: `${sym} Price & 50-Day Moving Average`,
                        font: {
                          size: 15,
                        },
                      },
                      paper_bgcolor: "rgba(0,0,0,0)",
                      plot_bgcolor: "rgba(0,0,0,0)",
                      font: {
                        color: "inherit",
                      },
                      margin: {
                        l: 50,
                        r: 20,
                        t: 50,
                        b: 45,
                      },
                      xaxis: {
                        showgrid: false,
                        zeroline: false,
                      },
                      yaxis: {
                        showgrid: true,
                        gridcolor: "rgba(255,255,255,0.08)",
                        zeroline: false,
                      },
                      legend: {
                        orientation: "h",
                        y: -0.2,
                      },
                    }}
                    config={{
                      responsive: true,
                      displayModeBar: false,
                    }}
                  />
                </div>
              </div>
            );
          })}

          {/* investment*/}
          <div
            style={{
              marginTop: "10px",
              marginBottom: "30px",
              padding: "18px",
              borderRadius: "12px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <h4
              style={{
                marginTop: 0,
                marginBottom: "12px",
              }}
            >
              If you invested $10,000
            </h4>

            {Object.entries(data).map(([sym, d]) => {
              const value = (10000 * d[d.length - 1].Close) / d[0].Close;

              return (
                <p
                  key={sym}
                  style={{
                    margin: "6px 0",
                    fontSize: "15px",
                  }}
                >
                  <strong>{sym}:</strong> ${value.toFixed(2)}
                </p>
              );
            })}
          </div>

          {/* comparison */}
          <div
            style={{
              width: "100%",
              overflowX: "auto",
              borderRadius: "12px",
              background: "rgba(255,255,255,0.025)",
              padding: "8px",
            }}
          >
            <Plot
              data={Object.entries(data).map(([sym, d]) => ({
                x: d.map((x) => x.Date),
                y: d.map((x) => x.Close),
                type: "scatter",
                mode: "lines",
                name: sym,
                line: {
                  width: 2,
                },
              }))}
              layout={{
                width: 700,
                height: 400,
                title: {
                  text: "Stock Comparison",
                  font: {
                    size: 16,
                  },
                },
                paper_bgcolor: "rgba(0,0,0,0)",
                plot_bgcolor: "rgba(0,0,0,0)",
                font: {
                  color: "inherit",
                },
                margin: {
                  l: 50,
                  r: 20,
                  t: 55,
                  b: 45,
                },
                xaxis: {
                  showgrid: false,
                  zeroline: false,
                },
                yaxis: {
                  showgrid: true,
                  gridcolor: "rgba(255,255,255,0.08)",
                  zeroline: false,
                },
                legend: {
                  orientation: "h",
                  y: -0.2,
                },
              }}
              config={{
                responsive: true,
                displayModeBar: false,
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}
