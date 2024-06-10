from flask import Flask, request, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["http://localhost:5173", "http://example.com"]}})


@app.route("/", methods=["GET", "POST", "PUT", "DELETE", "PATCH"])
def handle_request():
    response = {
        "method": request.method,
        "data": request.json if request.is_json else request.form,
    }
    return jsonify(response)


@app.route("/status", methods=["GET"])
def status():
    with open("data.json", "r") as json_file:
        data = json.load(json_file)
    return jsonify(data)


@app.route("/update", methods=["POST", "PATCH"])
def update_data():
    new_data = request.json
    if not new_data:
        return jsonify({"error": "Invalid JSON data"}), 400

    try:
        with open("data.json", "r") as json_file:
            data = json.load(json_file)

        if request.method == "POST":
            # Overwrite the existing data
            data = new_data
        elif request.method == "PATCH":
            # Update only specified fields
            data.update(new_data)

        with open("data.json", "w") as json_file:
            json.dump(data, json_file, indent=4)

        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
