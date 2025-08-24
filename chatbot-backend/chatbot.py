from flask import Flask, request, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)  # 👈 lar frontend snakke med backend

jokes = [
    "Why don’t scientists trust atoms? Because they make up everything!",
    "What do you call fake spaghetti? An impasta!",
    "Why was the math book sad? Because it had too many problems.",
    "Why don’t skeletons fight each other? They don’t have the guts.",
    "I told my computer I needed a break, and it said: 'No problem – I’ll go to sleep!'"
]

last_joke = None  # 👈 lagrer forrige vits så vi unngår repetisjon

@app.route("/chat", methods=["POST"])
def chat():
    global last_joke
    user_input = request.json.get("message", "")

    # trekk tilfeldig, men aldri samme som sist
    joke = random.choice(jokes)
    while joke == last_joke:
        joke = random.choice(jokes)

    last_joke = joke
    return jsonify({"reply": joke})

if __name__ == "__main__":
    app.run(port=5000, debug=True)
