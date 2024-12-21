from flask import Flask, send_from_directory, render_template, url_for
import subprocess
import os

app = Flask(__name__, static_folder='../static')

@app.route("/")
def home():
    dir = os.path.join(os.getcwd(), '..')
    return send_from_directory(dir, 'index.html')  # Renders the HTML template

# Route to trigger running the script
@app.route("/python")
def run_script():
    # Method 1: Using subprocess to call a Python file
    result = subprocess.run(["python", "Earthquake_SQL.py"], capture_output=True, text=True)

    # Return the output of the script
    return result.stdout

if __name__ == "__main__":
    app.run(debug=True)
