# Import Dependencies
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify
from flask_cors import CORS

import psycopg2

#################################################
# Database Setup
#################################################
engine = create_engine("postgresql://postgres:postgres@localhost:5432/realestate-ca_db")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(autoload_with=engine)

# Save reference to the table
CA_realestate = Base.classes.ca_realestate

#################################################
# Flask Setup
#################################################
app = Flask(__name__)
CORS(app)

#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Project 3: CA_RealEstate<br/>"
        f"Available Routes:<br/>"
        f"/api/v1.0/re_data"
    )


# @app.route("/api/v1.0/re_data")
# def re_data():
#     # Create our session (link) from Python to the DB
#     session = Session(engine)

#     """Return a list of all passenger names"""
#     # Query all passengers
#     results = session.query(Data.name).all()

#     session.close()

#     # Convert list of tuples into normal list
#     all_data = list(np.ravel(results))

#     return jsonify(all_data)

if __name__ == '__main__':
    app.run(debug=True)
