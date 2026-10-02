from flask import Flask, render_template, request, session, redirect, url_for
app = Flask(__name__)
app.secret_key = "schulung-geheimer-schluessel"
correct_num = 10
@app.route("/", methods=["GET"])
def index():
    return render_template(
        "index.html",
        message=None,
        game_over=False,
        won=False
    )
@app.route("/guess", methods=["POST"])
def guess():
    user_input =  int( request.form.get("guess"))
    if user_input == correct_num:
        result = {
                "message": "WELL DONE! You WON!",
                "won": True,
                "game_over": False
        }
    else: 
        result = {
                "message": "Sorry you lost. Please try again",
                "won": False,
                "game_over": False
            }
    return render_template(
        "index.html",
        message=result["message"],
        won=result["won"],
        game_over=result["game_over"]
    )
@app.route("/new-game", methods=["POST"])
def new_game():
    return redirect(url_for("index"))
if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)