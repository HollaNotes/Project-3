DROP TABLE IF EXISTS real_estate;

CREATE TABLE real_estate (
	status varchar (20), 
	bed numeric (15),
	bath numeric (15,2),
	acre_lot numeric (15),
	city varchar (55),
	state varchar (55),
	zip_code numeric (5),
	house_size numeric (8),
	prev_sold_date date,
	price numeric (10)
);

SELECT * From real_estate; 


