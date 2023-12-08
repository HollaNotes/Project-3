
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
Base.prepare(autoload_with=engine)

# Save reference to the table
realestateca = Base.classes.realestateca

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/descriptions<br/>"
        f"/api/v1.0/passengers"
    )


@app.route("/api/v1.0/descriptions")
def descriptions():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all passenger names"""
    # Query all passengers
    results = session.query(realestateca.description).all()

    session.close()

    # Convert list of tuples into normal list
    all_desc = list(np.ravel(results))

    return jsonify(all_desc)


@app.route("/api/v1.0/passengers")
def passengers():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of passenger data including the name, age, and sex of each passenger"""
    # Query all passengers
    results = session.query(realestateca.price, realestateca.yearBuilt, realestateca.county).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_passengers
    all_desc = []
    for name, age, sex in results:
        listing_dict = {}
        listing_dict["name"] = name
        listing_dict["age"] = age
        listing_dict["sex"] = sex
        all_desc.append(listing_dict)

    return jsonify(all_desc)


if __name__ == '__main__':
    app.run(debug=True)





















