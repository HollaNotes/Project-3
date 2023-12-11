from flask import Flask, jsonify
import psycopg2

app = Flask(__name__)

# Create a function to fetch data and jsonify it
def jsonify_all_data():
    conn = psycopg2.connect(database="Project 3", user="postgres", password="password", host="localhost", port="5432")
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM filter6")
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
    app.run(debug=True)

# import pandas as pd
# import numpy as np
# from flask import Flask, jsonify
# import sqlalchemy
# from sqlalchemy.ext.automap import automap_base
# from sqlalchemy.orm import Session
# from sqlalchemy import create_engine, inspect, text
# from pathlib import Path
# import pandas as pd
# from sqlalchemy import Column, Integer, String, Float
# from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy import create_engine, MetaData, Table, Column, ForeignKey
# from sqlalchemy.ext.automap import automap_base



# #################################################
# # Database Setup
# #################################################
# engine = create_engine("postgresql://postgres:password@localhost:5432/Project 3")

# # reflect an existing database into a new model
# Base = automap_base()
# # reflect the tables
# Base.prepare(engine, reflect=True)
# conn = engine.connect()


# # Save reference to the table
# realestateca = Base.classes.filter6

# #################################################
# # Flask Setup
# #################################################
# app = Flask(__name__)


# @app.route("/")
# def data():
#     # Create our session (link) from Python to the DB
#     session = Session(engine)
#     data = pd.read_sql("SELECT * FROM filter6", conn)

#     session.close()

#     # Convert list of tuples into normal list
#     realestateresults = list(np.ravel(data))

#     return jsonify(realestateresults)




# import pandas as pd
# import numpy as np
# from flask import Flask, jsonify
# from sqlalchemy import create_engine
# from sqlalchemy.orm import sessionmaker
# from sqlalchemy.ext.automap import automap_base

# engine = create_engine("postgresql://postgres:password@localhost:5432/Project 3")

# # reflect an existing database into a new model
# Base = automap_base()
# # reflect the tables
# Base.prepare(engine, reflect=True)

# # Save reference to the table
# realestateca = Base.classes.filter6

# #################################################
# # Flask Setup
# #################################################
# app = Flask(__name__)

# @app.route("/")
# def data():
#     # Create our session (link) from Python to the DB
#     Session = sessionmaker(bind=engine)
#     session = Session()

#     # Query all data from the table
#     data = session.query(realestateca).all()

#     session.close()

#     # Convert query result to a list of dictionaries
#     realestateresults = []
#     for row in data:
#         row_dict = {
#             "temp_index": row.temp_index,
#             "event": row.event,
#             "price": row.price,
#             "city": row.city,
#             "datePostedString": row.datePostedString,   
#             "event": row.event,
#             "price": row.price,
#             "pricePerSquareFoot": row.pricePerSquareFoot,
#             "city": row.city, 
#             "state": row.state,
#             "yearBuilt": row.yearBuilt,
#             "streetAddress": row.streetAddress,   
#             "zipcode": row.zipcode,
#             "longitude": row.longitude,
#             "latitude": row.latitude,   
#             "description":  row.description,
#             "currency":  row.currency,   
#             "livingArea":  row.livingArea,   
#             "livingAreaValue":  row.livingAreaValue,
#             "lotAreaUnits":  row.lotAreaUnits,
#             "bathrooms":    row.bathrooms,
#             "bedrooms":  row.bedrooms,  
#             "buildingArea": row.buildingArea,
#             "parking": row.parking,
#             "garageSpaces": row.garageSpaces,   
#             "hasGarage": row.hasGarage,
#             "levels": row.levels,  
#             "pool": row.pool,  
#             "spa": row.spa,
#             "isNewConstruction": row.isNewConstruction,
#             "hasPetsAllowed": row.hasPetsAllowed,
#             "homeType": row.homeType,   
#             "county": row.county
#         }
#         realestateresults.append(row_dict)

#     return jsonify(realestateresults)

# if __name__ == '__main__':
#     app.run(debug=True)


