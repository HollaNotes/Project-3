from flask import Flask, jsonify
import psycopg2
from flask_cors import CORS

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Create a function to fetch data and jsonify it
def jsonify_all_data():
    conn = psycopg2.connect(database="Project 3", user="postgres", password="password", host="localhost", port="5432")
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM filter6")
    realestCA = cursor.fetchall()

    column_names = [desc[0] for desc in cursor.description]  # Fetch column names

    cursor.close()
    conn.close()

    # Create a list to store dictionaries
    RE_list = []

    # Convert each row tuple to a dictionary
    for row in realestCA:
        RE_dict = {}
        for idx, column in enumerate(column_names):
            RE_dict[column] = row[idx]
        RE_list.append(RE_dict)

    return jsonify(RE_list)

# Create a route to access the function
@app.route("/", methods=["GET"])
def get_RED():
    return jsonify_all_data()

if __name__ == "__main__":
    app.run(debug=False)



# # RUN THIS PORTION IF THE JSON NEEDS TO BE UPDATED ##
# from flask import Flask, jsonify
# import psycopg2
# import json
# from decimal import Decimal
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)

# def jsonify_all_data():
#     try:
#         conn = psycopg2.connect(database="Project 3", user="postgres", password="password", host="localhost", port="5432")
#         cursor = conn.cursor()

#         cursor.execute("SELECT * FROM filter6")
#         realestCA = cursor.fetchall()

#         column_names = [desc[0] for desc in cursor.description] 

#         cursor.close()
#         conn.close()

#         RE_list = []

#         for row in realestCA:
#             RE_dict = {}
#             for idx, column in enumerate(column_names):
#                 value = row[idx]
#                 if isinstance(value, Decimal):
#                     # Convert Decimal to float for JSON serialization
#                     value = float(value)
#                 RE_dict[column] = value
#             RE_list.append(RE_dict)

#         return RE_list
#     except Exception as e:
#         return f"Error: {str(e)}"

# @app.route("/", methods=["GET"])
# def get_RED():
#     real_estate_data = jsonify_all_data()

#     if isinstance(real_estate_data, list):
#         try:
#             with open("static/data/realEstate_data.json", "w") as file:
#                 json.dump(real_estate_data, file, indent=4)
#             return "JSON data saved as realEstate_data"
#         except Exception as e:
#             return f"Error saving JSON: {str(e)}"
#     else:
#         return real_estate_data

# if __name__ == "__main__":
#     app.run(debug=True)