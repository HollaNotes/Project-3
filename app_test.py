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
#             "country": row.country,
#             "datePostedString": row.datePostedString,   
#             "is_bankOwned": row.is_bankOwned ,  
#             "is_forAuction": row.is_forAuction,
#             "event": row.event,
#             "time": row.time,   
#             "price": row.price,
#             "pricePerSquareFoot": row.pricePerSquareFoot,
#             "city": row.city  , 
#             "state": row.state ,
#             "yearBuilt": row.yearBuilt,
#             "streetAddress": row.streetAddress ,   
#             "zipcode": row.zipcode,
#             "longitude": row.longitude,
#             "latitude": row.latitude,   
#             "hasBadGeocode":  row.hasBadGeocode, 
#             "description":  row.description ,
#             "currency":  row.currency,   
#             "livingArea":  row.livingArea,   
#             "livingAreaValue":  row.livingAreaValue,
#             "lotAreaUnits":  row.lotAreaUnits,
#             "bathrooms":    row.bathrooms,
#             "bedrooms":  row.bedrooms ,  
#             "buildingArea": row.buildingArea,
#             "parking": row.parking ,
#             "garageSpaces": row.garageSpaces,   
#             "hasGarage": row.hasGarage,
#             "levels": row.levels ,  
#             "pool": row.pool ,  
#             "spa": row.spa,
#             "isNewConstruction": row.isNewConstruction,
#             "hasPetsAllowed": row.hasPetsAllowed,
#             "homeType": row.homeType,   
#             "county": row.county
  

#         }
#         realestateresults.append(row_dict)

#     return jsonify({'data': realestateresults})

# if __name__ == '__main__':
#     app.run()




import pandas as pd
import numpy as np
from flask import Flask, jsonify
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, inspect, text
from pathlib import Path
import pandas as pd
from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine, MetaData, Table, Column, ForeignKey
from sqlalchemy.ext.automap import automap_base



#################################################
# Database Setup
#################################################
engine = create_engine("postgresql://postgres:password@localhost:5432/Project 3")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)
conn = engine.connect()


# Save reference to the table
realestateca = Base.classes.filter6

#################################################
# Flask Setup
#################################################
app = Flask(__name__)




#################################################
# Flask Routes
#################################################


# @app.route("/")
# def welcome():
#     return (
#         f"PLEASE PLEASE PLEASE WORK<br/>"
#         f"Available Routes:<br/>"
#         f"/api/v1.0/DATA"
#     )




@app.route("/")
def data():
    # Create our session (link) from Python to the DB
    session = Session(engine)
    data = pd.read_sql("SELECT * FROM filter6", conn)

    """Return a list of all passenger names"""
    # Query all passengers
    # results = session.query(realestateca.temp_index).all()
    # results = session.query(realestateca.temp_index,  \
    #                         realestateca.event, realestateca.price, \
    #                             realestateca.city, realestateca.state, realestateca.yearBuilt, \
    #                                 realestateca.streetAddress, realestateca.zipcode, realestateca.longitude, \
    #                                     realestateca.latitude, realestateca.description, \
    #                                         realestateca.currency,  realestateca.livingArea, realestateca.livingAreaValue, \
    #                                             realestateca.lotAreaUnits,   realestateca.bathrooms,realestateca.bedrooms, \
    #                                                 realestateca.buildingArea, realestateca.parking,  realestateca.garageSpaces, \
    #                                                     realestateca.hasGarage, realestateca.levels, realestateca.pool, realestateca.spa, \
    #                                                         realestateca.isNewConstruction, realestateca.hasPetsAllowed, realestateca.homeType, realestateca.county).all()

    session.close()

    # Convert list of tuples into normal list
    realestateresults = list(np.ravel(data))

    return jsonify(realestateresults)















































































