from flask_cors import CORS
from flask import Flask, jsonify, request
import yfinance as yf
import pandas as pd

app = Flask(__name__)
CORS(app)

@app.route("/stock")
def get_stock():
    symbol = request.args.get("symbol", "AAPL")

    data = yf.download(symbol, period="1y", auto_adjust=True)
    data.columns = [col[0] for col in data.columns]

    data.reset_index(inplace=True)
    data["Date"] = data["Date"].astype(str)

    return jsonify(data.to_dict(orient="records"))

# RENDER
if __name__ == "__main__":
    import os

    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)