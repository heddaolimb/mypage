from flask import Flask, request, jsonify
import random

app = Flask(__name__)

jokes = [
    "Why don’t scientists trust atoms? Because they make up everything!",
    "What do you call fake spaghetti? An impasta!",
    "Why was the math book sad? Because it had too many problems.",
    "Why don’t skeletons fight each other? They don’t have the guts.",
    "I told my computer I needed a break, and it said: 'No problem – I’ll go to sleep!'"
]

@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json.get("message", "")
    response = random.choice(jokes)
    return jsonify({"reply": response})

if __name__ == "__main__":
    app.run(port=5000, debug=True)
