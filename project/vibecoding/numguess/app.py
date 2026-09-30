from flask import Flask, render_template, request, session, redirect, url_for

app = Flask(__name__)

# Für die Flask-Session.
# In einer echten Anwendung sollte dieser Wert geheim sein.
app.secret_key = "schulung-geheimer-schluessel"


@app.route("/", methods=["GET"])
def index():
    # Hier wird die aktuelle Spielseite angezeigt.
    #
    # Falls noch kein Spiel existiert, könnt ihr hier
    # eure eigene Initialisierungslogik aufrufen.

    return render_template(
        "index.html",
        message=None,
        game_over=False,
        won=False
    )


@app.route("/guess", methods=["POST"])
def guess():
    # Wert aus dem HTML-Formular auslesen
    user_input = request.form.get("guess")

    # Eingabe an eure Python-Logik weitergeben
    #
    # ------------------------------------------------
    # HIER EURE EIGENE SPIELLOGIK EINSETZEN
    # ------------------------------------------------
    #
    # Beispielhafte Schnittstelle:
    #
    # result = game_logic.check_guess(
    #     guess=user_input,
    #     target=session.get("target"),
    #     attempts=session.get("attempts", 0)
    # )
    #
    # Die konkrete Implementierung bleibt euch überlassen.
    #
    # result könnte beispielsweise enthalten:
    # {
    #     "message": "...",
    #     "won": False,
    #     "game_over": False,
    #     "attempts": 1
    # }

    result = {
        "message": "Hier kommt das Ergebnis eurer Spiellogik hin.",
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
    # ------------------------------------------------
    # HIER EURE EIGENE INITIALISIERUNGSLOGIK EINSETZEN
    # ------------------------------------------------
    #
    # Zum Beispiel:
    #
    # session["target"] = ...
    # session["attempts"] = 0
    #
    # Die konkrete Erzeugung der Zufallszahl
    # implementiert ihr selbst.

    # Anschließend zur Startseite zurückkehren
    return redirect(url_for("index"))


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
