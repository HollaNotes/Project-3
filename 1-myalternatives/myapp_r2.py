from flask import Flask, jsonify
import psycopg2
from flask_cors import CORS

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Create a function to fetch data and jsonify it
def jsonify_all_data():
    conn = psycopg2.connect(database="realestate-ca_db", user="postgres", password="postgres", host="localhost", port="5432")
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM ca_realestate")
    users = cursor.fetchall()

    column_names = [desc[0] for desc in cursor.description]  # Fetch column names

    cursor.close()
    conn.close()

    # Create a list to store dictionaries
    users_list = []

    # Convert each row tuple to a dictionary
    for row in users:
        user_dict = {}
        for idx, column in enumerate(column_names):
            user_dict[column] = row[idx]
        users_list.append(user_dict)

    return jsonify(users_list)

# Create a route to access the function
@app.route("/", methods=["GET"])
def get_users():
    return jsonify_all_data()

if __name__ == "__main__":
    app.run(port=5000)