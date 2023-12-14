# Project 3: Californa Houses Search
**Team: Noelle Watson, Vanessa Dumlao, Xuexuan Xu**




----------------------------------------------------------------------------------------------------------------------------------------------
**Inspiration & Ideation**
----------------------------------------------------------------------------------------------------------------------------------------------
The inspiration for this project came from our interest in real estate and the idea of making a real estate listing search tool for people trying to buy homes. We combed through many real estate datasets, and decided to work with a dataset we found on Kaggle.com named [**Real Estate California:** Real estate listings collected in the first 6 months of 2021.][1] We created a mock up of how we ideally wanted our page to look and how we wanted it to function:

[mock_webpage.pdf](https://github.com/HollaNotes/Project-3/files/13678176/mock_webpage.pdf)

We then created a [GitHub Project][2] and set a board with activities we needed to do, things we have in progress, and items that are completed. 

Next, we moved on the the **E**xtract **T**ransfom **L**oad portion of our project.



----------------------------------------------------------------------------------------------------------------------------------------------
**Extract, Transform, Load (ETL)**
----------------------------------------------------------------------------------------------------------------------------------------------
- Cleaning our dataset in pandas:
  - We downloaded our dataset into a Jupyter Notebook and ported dependencis such as Pandas, Numpy, and PPrint. We then statred cleaning the data by calling for more information on the data, printing the columns, getting the unique number of ids from the dataset, dropped N/A values, ensured there were no duplicate entries, and then did a little filtering to clean out data that did not make sense to us as a feasible listing. These are the steps we took in cleaning our data:
    
    - We got rid of any homes listed for under $1000
    - Removed any homes with less than 120 squarefeet
    - Removed any that had zero bathrooms listed
    - Removed any that were listed as a multi-family or lot listings
    - Saved our cleaned data to a csv named filter6.csv      
- Loading cleaned data into PostgresSQL / schema creation:
  - We created a database in PostgresSQL and then created a schema based on our cleaned data. We then ran it in PostgresSQL to create our table. Once our table was created, we imported our csv and performed a search to see all of our data and ensure it was loaded in PostgresSQL correctly. 
- Python / Flask API / JSONIFY:
  - We used python and imported Flask, jsonify, and psycopg2, and CORS to create our web application, interact with PostresSql, create a json response, and handle cross-origin resource sharing.
    - *Fetching all data and converting to JSON*:
      - We used jsonify_all_data() to retrieve information from PostresSQL and convert it into a JSON response by providing database information and log in credentials
      - Executed a SQL query (SELECT * FROM filter6) in order to search for our entire cleaned dataset
      - Creaded a list of dictionaries ('RE_list') where each dictionary represents a row from the data we just fetched
      - Each dictionary ('RE_dict') maps the keys to their respective values
      - Returns the JSON respose using jsonify() that contains the data we fetched in a list of dictionaries
    - *Creating route & Handling Route*:
      - We used @app.route("/", methods=["GET"]) to create a route from the root URL via HTTP GET requests
      - We used def get_RED() to call jsonify_all_data() to return the JSON data from PostgresSQL
    - *Running the application*:
      - We ran app.run(debug=False) to start the application on our local server.
  - We created another version of this code below that we only need to run if we need to save another version of our JSON file. This code block takes the fetched data and saves it in JSON format so you can access it locally. The main difference is that this portion of the code processes the fetched data and saves it as a JSON instead of directly returning a JSON response.
- Pulling data into JavaScript with D3:
  - Once our app.py was working and we were able to successfully pull our data from PostgresSQL, we started creating HTML, JavaScript, and CSS files. In order to bring our data into JavaScript, we made an outline for our HTML page and brought in Leaflet, D3, bootstrap, and any JavaScript or Leaflet files we would need to access in order to make our web application work. We then began accessing data with D3 in order to use our data to create the necessary functions we would need to use for this project.


----------------------------------------------------------------------------------------------------------------------------------------------
**Filtering**
----------------------------------------------------------------------------------------------------------------------------------------------
Our web application relies heavily on a filtering functions we created in order for the user to search for the criteria they want when looking for a home. Our web application allows you to choose a city from a drop down, enter in the min and max price, min and max bedrooms, and min and max bathrooms you are looking for in your search.

**Steps taken to create filter**:
- *Element selection*: We used document.getElementById to select several html elements with drop downs, buttons, and containers
- *Initialization and set-up*: We initialized our variables to hold min and max values for price, bedrooms, and bathrooms.
- *init() function*: This function uses D3 to fetch the data from our specified URL and extracts unique city names from the data as well as populated the drop downs. It also calls the filterAndRefeshTable() function to display the initial table based on defaut criteria we chose.
- *filterData() function*: This function filters the realestate data based on criteria selected by the user and retrieves the selected values bades on user-decided criteria. 
- *updateTable() funtion*: This function is used to clear the content of the table container displaying search results and creates a new html table based on the new input from the filter.
- *filterAndRefreshTable() function*: This uses D3 to fetch data and put it through the filterData() function. It then updates the table based on the filtered data using updateTable().
- *resetInitialValues() function*: This is here as a placeholder for the logic to reset the initial values.
- *Event listeners*: Event listeners were attached to the 'filter' button and to the dropdown.


----------------------------------------------------------------------------------------------------------------------------------------------
**Visualizations**
----------------------------------------------------------------------------------------------------------------------------------------------
**Map**
- Our map was created with html, javascript, and leaflet. It displays the fetched real estate data on an interactive map. This is a seperate file from the rest of our logic. We tried to put everything onto one Javascript file, but we kept running into errors, so we decided to keep them separated. Since it is a separate file, many of the functions we used in the filtering portion are also on this file to ensure it changes based on any changes in the filter.
- We created our map by initializing Leaflet with a defined location and initializes the zoom functionality. We then created a tile layer from OpenStreetMap and insert the map into the HTML element with the "map" id.
- We used D3 to read in our json file and retrieve data and save coordinates from the data. A limit of 20 entries was implemented and we iterate through the coordinates array to add in markers and bind our popups.
- We then use updateMapMarkers() to clear any existing markers and add in new markers when the filter is changed.


**Graph**
-









----------------------------------------------------------------------------------------------------------------------------------------------
**Directory of files**
----------------------------------------------------------------------------------------------------------------------------------------------
**Resources**:
-  Project 3/Resources/RealEstate_California2.csv
  - Initial csv from Kaggle with an added temporary index we needed as a primary key
-   Project 3/Resources/filter6-static.csv & filter6.csv
  - CSV outputs after data cleaning in python.   

**Static files and locations**:
- Project 3/static css, data, and js
  - css: This is the main styling page used. There is no remote version, so this one stays here in the static folder
  - data: This is the saved, static json that was created with Flask, the schema we used for PostgresSQL, and the jupyter notebook we used to clean the data
  - js:
    - Logic_filter&bar.js - This file holds the funtions for the graph and for our filtering and reseting logic
    - logic-map.js - This file holds the functions for the map and filtering and resetting functions
**Remote files and locations**:
- The remote files are almost identical to the static files, however they pull from the remote server.

**Additional files**:
- index_all_elements.html - the html for our web application
- app.py - the file that uses Flask to pull data from postgresSQL and bring it through as a JSON
- mock_webpage - an image of the image we made while going through ideation

----------------------------------------------------------------------------------------------------------------------------------------------

[1]: https://www.kaggle.com/datasets/yellowj4acket/real-estate-california
[2]: https://github.com/users/HollaNotes/projects/2/views/4

