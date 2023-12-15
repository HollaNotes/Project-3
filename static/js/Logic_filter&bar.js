let cityDropdown = document.getElementById('cityDropdown');
let filterBtn = document.getElementById('filter-btn');
let tableContainer = document.getElementById('filteredTableContainer');

// Initial values
let elPriceMin = document.getElementById('price-min');
let elPriceMax = document.getElementById('price-max');
let elBedroomMin = document.getElementById('bedroom-min');
let elBedroomMax = document.getElementById('bedroom-max');
let elBathroomMin = document.getElementById('bathroom-min');
let elBathroomMax = document.getElementById('bathroom-max');

// Initial values
let initialPriceMinEl = parseInt(elPriceMin.value);
let initialPriceMaxEl = parseInt(elPriceMax.value);
let initialBedroomMinEl = parseInt(elBedroomMin.value);
let initialBedroomMaxEl = parseInt(elBedroomMax.value);
let initialBathroomMinEl = parseInt(elBathroomMin.value);
let initialBathroomMaxEl = parseInt(elBathroomMax.value);

// Current values
let priceMinEl = initialPriceMinEl;
let priceMaxEl = initialPriceMaxEl;
let bedroomMinEl = initialBedroomMinEl;
let bedroomMaxEl = initialBedroomMaxEl;
let bathroomMinEl = initialBathroomMinEl;
let bathroomMaxEl = initialBathroomMaxEl;


// Store the local host as url
let url = "https://raw.githubusercontent.com/HollaNotes/Project-3/main/static/data/realEstate_data.json";

// Function to initialize the page
function init() {
    d3.json(url).then(function (properties) {

        // Set to store unique cities
        let uniqueCities = new Set();

        // Loop through the dataset and add unique options to the dropdown
        properties.forEach(property => {
            let city = property.city;

            // Check if the city is not already added
            if (!uniqueCities.has(city)) {
                uniqueCities.add(city);

                let option = document.createElement('option');
                option.value = city;
                option.text = city;
                cityDropdown.appendChild(option);
            };
        });

        // Call the table in the inital page
        filterAndRefreshTable();
    });
};



function filterData(properties) {
    let selectedCity = cityDropdown.value;
    priceMinEl = parseInt(document.getElementById('price-min').value);
    priceMaxEl = parseInt(document.getElementById('price-max').value);
    bedroomMinEl = parseInt(document.getElementById('bedroom-min').value);
    bedroomMaxEl = parseInt(document.getElementById('bedroom-max').value);
    bathroomMinEl = parseInt(document.getElementById('bathroom-min').value);
    bathroomMaxEl = parseInt(document.getElementById('bathroom-max').value);

    return properties.filter(item => {
        let city = item.city;
        let price = parseInt(item.price);
        let bedroom = parseInt(item.bedrooms);
        let bathroom = parseInt(item.bathrooms);

        return (
            city === selectedCity &&
            price >= priceMinEl && price <= priceMaxEl &&
            bedroom >= bedroomMinEl && bedroom <= bedroomMaxEl &&
            bathroom >= bathroomMinEl && bathroom <= bathroomMaxEl
        );
    });
};

function updateTable(filteredProperties) {
    // Clear previous content
    tableContainer.innerHTML = '';

    if (filteredProperties.length === 0) {
        tableContainer.innerHTML = '<p>No properties match the criteria.</p>';
        return;
    }

    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');

    // Create table headers
    let headers = ['Address', 'Price', 'Bedroom', 'Bathroom', 'House Size', 'City', 'Zip', 'Year built', 'House Type'];
    let headerRow = document.createElement('tr');
    headers.forEach(headerText => {
        let th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table rows with filtered data
    filteredProperties.forEach(property => {
        let row = document.createElement('tr');
        let columns = ['streetaddress', 'price', 'bedrooms', 'bathrooms', 'buildingarea', 'city', 'zipcode', 'yearbuilt', 'hometype'];
        columns.forEach(column => {
            let td = document.createElement('td');
            td.textContent = property[column];
            row.appendChild(td);
        });
        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    tableContainer.appendChild(table);
};




// Function to create a bar graph
function bargraph(data) {
    // Extracting data for plot
    let prices = data.map(object => parseFloat(object.price));
    let bedrooms = data.map(object => parseFloat(object.bedrooms));
    let addresses = data.map(object => object.streetaddress); 
    let sqft = data.map(object => parseFloat(object.livingarea));
    let yearbuilt = data.map(object => parseFloat(object.yearbuilt));
    

    // Create trace for Plotly with custom hover text
    let trace1 = {
        x: prices.slice(0,20).reverse(),
        y: sqft.slice(0,20).reverse(),
        text: addresses, // Set custom hover text (addresses in this case)
        hoverinfo: "text+x",  // Show custom text and x-value in hover info
        mode: 'markers',
        type: 'scatter'
          
    };

    // Data array
    let plotData = [trace1];

    // Apply a title to the layout and add axis labels
    let layout = {
        title: "Price per Sqft",
        margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 100
        },
        font: {
            family: "Arial, sans-serif"
        },
        xaxis: {
            title: 'Prices' // X-axis label,
        },
        yaxis: {
            title: 'Sqft' // Y-axis label
        }
    };

    // Update the existing graph or create a new one
    Plotly.newPlot("bar", plotData, layout);
}


// Function to filter data and update the table and graph
function filterAndRefreshTable() {
    d3.json(url).then(function (properties) {
        let filteredData = filterData(properties);
        updateTable(filteredData);

        // After updating the table, call the bargraph function
        bargraph(filteredData);
    });
}

// Function to reset the initial values
function resetInitialValues() {
    // Resetting initial values logic
    priceMinEl = initialPriceMinEl;
    priceMaxEl = initialPriceMaxEl;
    bedroomMinEl = initialBedroomMinEl;
    bedroomMaxEl = initialBedroomMaxEl;
    bathroomMinEl = initialBathroomMinEl;
    bathroomMaxEl = initialBathroomMaxEl;
    // Initial values
    elPriceMin.value = initialPriceMinEl;
    elPriceMax.value = initialPriceMaxEl;
    elBedroomMin.value= initialBedroomMinEl;
    elBedroomMax.value = initialBedroomMaxEl;
    elBathroomMin.value = initialBathroomMinEl;
    elBathroomMax.value = initialBathroomMaxEl;
   
}

// Add event listener to the button
filterBtn.addEventListener('click', function () {
    // Call the filter table after clicking the button apply
    filterAndRefreshTable();
});

// Event listener for the dropdown change event
cityDropdown.addEventListener('change', function () {
    // Reset the initial values when the city changes
    resetInitialValues();

    // Call filter and refresh table
    filterAndRefreshTable();
});

// Show the initial page
init();