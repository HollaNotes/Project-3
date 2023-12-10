DROP TABLE IF EXISTS filter6;

CREATE TABLE filter6 (
	temp_index VARCHAR PRIMARY KEY,
	id	VARCHAR,
	stateId	NUMERIC,
	countyId NUMERIC,
	cityId NUMERIC,
	country VARCHAR,
	datePostedString VARCHAR,
	is_bankOwned VARCHAR,
	is_forAuction VARCHAR,
	event VARCHAR,
	time NUMERIC,
	price NUMERIC,
	pricePerSquareFoot NUMERIC,
	city VARCHAR,
	state VARCHAR,
	yearBuilt NUMERIC,
	streetAddress VARCHAR,
	zipcode NUMERIC,
	longitude NUMERIC,	
	latitude NUMERIC,
	hasBadGeocode VARCHAR,
	description TEXT , 
	currency VARCHAR, 
	livingArea NUMERIC, 
	livingAreaValue NUMERIC,
	lotAreaUnits VARCHAR,	
	bathrooms NUMERIC,
	bedrooms NUMERIC,
	buildingArea NUMERIC, 
	parking VARCHAR, 	
	garageSpaces NUMERIC,
	hasGarage VARCHAR,
	levels VARCHAR,
	pool VARCHAR,
	spa VARCHAR,
	isNewConstruction VARCHAR,
	hasPetsAllowed VARCHAR,
	homeType VARCHAR,
	county VARCHAR
);