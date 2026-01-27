from flask import Flask, request, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

jokes = [
    "Why don’t scientists trust atoms? Because they make up everything!",
    "What do you call fake spaghetti? An impasta!",
   "What did the buffalo say when his son left for college? Bison.",
    "Why don’t skeletons fight each other? They don’t have the guts.",
   "Why did the frog take the bus to work today? His car got toad away.",
    "What did the shark say when he ate the clownfish? This tastes a little funny.",
    "What is an astronaut’s favorite part on a computer? The space bar.",
    "Why did the yogurt go to the art exhibition? Because it was cultured.",
    "What do you call an apology written in dots and dashes? Re-Morse code",
    "Why do French people eat snails? They don’t like fast food.",
    "Why did the golfer wear two pairs of pants? Just in case he got a hole in one!",
    "What did 0 say to 8? “Nice belt.”",
    "Why do Java developers wear glasses? Because they dont C#.",
    "What did Times New Roman say to Comic Sans? ... I hate your type.",
    "Why did the developer quit their job so fast? Because they couldn’t commit.",
    "Why do developers like dark mode? Because light attracts bugs.",
    "How do robots eat pizza? One byte at a time.",
    "What do computers and air conditioners have in common? They both become useless when you open windows.",
    "Why was the JavaScript developer sad? Because they didn’t Node how to Express themselves.",
    "Why did the HTML developer go broke? Because he kept needing a <br>.",
]

last_joke = None

@app.route("/chat", methods=["POST"])
def chat():
    global last_joke
    user_input = request.json.get("message", "")

   
    joke = random.choice(jokes)
    while joke == last_joke:
        joke = random.choice(jokes)

    last_joke = joke
    return jsonify({"reply": joke})

if __name__ == "__main__":
    app.run(port=5000, debug=True)
