import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify



#################################################
# Database Setup
#################################################
engine = create_engine("postgresql://postgres:password@localhost:5432/Project 3")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)


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

    """Return a list of all passenger names"""
    # Query all passengers
    results = session.query(realestateca.temp_index).all()
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
    realestateresults = list(np.ravel(results))

    return jsonify(realestateresults)


# @app.route("/api/v1.0/descriptions")
# def descriptions():
#     # Create our session (link) from Python to the DB
#     session = Session(engine)

#     """Return a list of all passenger names"""
#     # Query all passengers
#     results = session.query(realestateca2.description).all()

#     session.close()

#     # Convert list of tuples into normal list
#     all_desc = list(np.ravel(results))

#     return jsonify(all_desc)


# @app.route("/api/v1.0/passengers")
# def passengers():
#     # Create our session (link) from Python to the DB
#     session = Session(engine)

#     """Return a list of passenger data including the name, age, and sex of each passenger"""
#     # Query all passengers
#     results = session.query(realestateca2.price, realestateca2.yearBuilt, realestateca2.county).all()

#     session.close()

#     # Create a dictionary from the row data and append to a list of all_passengers
#     all_desc = []
#     for name, age, sex in results:
#         listing_dict = {}
#         listing_dict["name"] = name
#         listing_dict["age"] = age
#         listing_dict["sex"] = sex
#         all_desc.append(listing_dict)

#     return jsonify(all_desc)


if __name__ == '__main__':
    app.run(debug=True)




import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify


#################################################
# Database Setup
#################################################
engine = create_engine("postgresql://postgres:password@localhost:5432/Project 3")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
realestateca = Base.classes.realestateca2

#################################################
# Flask Setup
#################################################
app = Flask(__name__)



#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    return (
        f"PLEASE PLEASE PLEASE WORK<br/>"
        f"Available Routes:<br/>"
        f"/api/v1.0/DATA"
    )



@app.route("/api/v1.0/DATA")
def data():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query all passengers
    results = session.query(realestateca.name).all()

    # Convert list of tuples into normal list
    realestateresults = list(np.ravel(results))

    return jsonify(realestateresults)

if __name__ == '__main__':
    app.run(debug=True)


    # # Query all records
    # results = session.query(realestateca.temp_index, realestateca.id, realestateca.stateId, realestateca.countyId, realestateca.cityId, realestateca.country, realestateca.datePostedString, realestateca.is_bankOwned, realestateca.is_forAuction, realestateca.event, realestateca.time, realestateca.price, realestateca.pricePerSquareFoot, realestateca.city, realestateca.state, realestateca.yearBuilt, realestateca.streetAddress, realestateca.zipcode, realestateca.longitude, realestateca.latitude, realestateca.hasBadGeocode, realestateca.description, realestateca.currency,  realestateca.livingArea, realestateca.livingAreaValue, realestateca.lotAreaUnits,   realestateca.bathrooms,realestateca.bedrooms, realestateca.buildingArea, realestateca.parking,  realestateca.garageSpaces, realestateca.hasGarage, realestateca.levels, realestateca.pool, realestateca.spa, realestateca.isNewConstruction, realestateca.hasPetsAllowed, realestateca.homeType, realestateca.county).all() 

    # session.close()

    # all_records = []
    # for temp_index, id, stateId, countyId, cityId, country, datePostedString, is_bankOwned, is_forAuction,  event,  time,   price,  pricePerSquareFoot, city,   state,  yearBuilt,  streetAddress,  zipcode,    longitude,  latitude,   hasBadGeocode,  description,    currency,   livingArea, livingAreaValue,    lotAreaUnits,   bathrooms,  bedrooms,   buildingArea,   parking, garageSpaces,  hasGarage,  levels, pool, spa, isNewConstruction, hasPetsAllowed,   homeType, county in results:
    #     all_records_dict = {}
    #     all_records_dict["temp_index"] = temp_index
    #     all_records_dict["id"] = id
    #     all_records_dict["stateId"] = stateId
    #     all_records_dict["countyId"] = countyId
    #     all_records_dict["cityId"] =  cityId  
    #     all_records_dict["country_d"] = country
    #     all_records_dict["datePostedString"] = datePostedString   
    #     all_records_dict["is_bankOwned"] = is_bankOwned   
    #     all_records_dict["is_forAuction"] =   is_forAuction
    #     all_records_dict["event"] =   event
    #     all_records_dict["time"] = time   
    #     all_records_dict["price"] =   price
    #     all_records_dict["pricePerSquareFoot"] = pricePerSquareFoot
    #     all_records_dict["city"] = city   
    #     all_records_dict["state"] = state 
    #     all_records_dict["yearBuilt"] = yearBuilt
    #     all_records_dict["streetAddress"] = streetAddress    
    #     all_records_dict["zipcode"] = zipcode
    #     all_records_dict["longitude"] =   longitude
    #     all_records_dict["latitude"] = latitude   
    #     all_records_dict["hasBadGeocode"] = hasBadGeocode 
    #     all_records_dict["description"] = description 
    #     all_records_dict["currency"] = currency   
    #     all_records_dict["livingArea"] = livingArea   
    #     all_records_dict["livingAreaValue"] = livingAreaValue
    #     all_records_dict["lotAreaUnits"] = lotAreaUnits
    #     all_records_dict["bathrooms"] =   bathrooms
    #     all_records_dict["bedrooms"] = bedrooms   
    #     all_records_dict["buildingArea"] = buildingArea
    #     all_records_dict["parking"] = parking 
    #     all_records_dict["garageSpaces"] = garageSpaces   
    #     all_records_dict["hasGarage"] = hasGarage
    #     all_records_dict["levels"] = levels   
    #     all_records_dict["pool"] = pool   
    #     all_records_dict["spa"] = spa
    #     all_records_dict["isNewConstruction"] = isNewConstruction
    #     all_records_dict["hasPetsAllowed"]    = hasPetsAllowed
    #     all_records_dict["homeType"] = homeType   
    #     all_records_dict["county"] = county
    # all_records.append(all_records_dict)

    # return jsonify(all_records)





































