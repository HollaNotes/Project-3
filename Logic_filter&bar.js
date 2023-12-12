var cityDropdown = document.getElementById('cityDropdown');
var filterBtn = document.getElementById('filter-btn');
var tableContainer = document.getElementById('filteredTableContainer');

// Initial values
var elPriceMin = document.getElementById('price-min');
var elPriceMax = document.getElementById('price-max');
var elBedroomMin = document.getElementById('bedroom-min');
var elBedroomMax = document.getElementById('bedroom-max');
var elBathroomMin = document.getElementById('bathroom-min');
var elBathroomMax = document.getElementById('bathroom-max');

// Initial values
var initialPriceMinEl = parseInt(elPriceMin.value);
var initialPriceMaxEl = parseInt(elPriceMax.value);
var initialBedroomMinEl = parseInt(elBedroomMin.value);
var initialBedroomMaxEl = parseInt(elBedroomMax.value);
var initialBathroomMinEl = parseInt(elBathroomMin.value);
var initialBathroomMaxEl = parseInt(elBathroomMax.value);

// Current values
var priceMinEl = initialPriceMinEl;
var priceMaxEl = initialPriceMaxEl;
var bedroomMinEl = initialBedroomMinEl;
var bedroomMaxEl = initialBedroomMaxEl;
var bathroomMinEl = initialBathroomMinEl;
var bathroomMaxEl = initialBathroomMaxEl;


// Store the local host as url
let url = "https://raw.githubusercontent.com/HollaNotes/Project-3/main/users_data.json";

// Function to initialize the page
function init() {
    d3.json(url).then(function (properties) {

        // Set to store unique cities
        const uniqueCities = new Set();

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
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    // Create table headers
    const headers = ['Address', 'Price', 'Bedroom', 'Bathroom', 'House Size', 'City', 'Zip', 'Year built', 'House Type'];
    const headerRow = document.createElement('tr');
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table rows with filtered data
    filteredProperties.forEach(property => {
        const row = document.createElement('tr');
        const columns = ['streetaddress', 'price', 'bedrooms', 'bathrooms', 'buildingarea', 'city', 'zipcode', 'yearbuilt', 'hometype'];
        columns.forEach(column => {
            const td = document.createElement('td');
            td.textContent = property[column];
            row.appendChild(td);
        });
        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    tableContainer.appendChild(table);
};


// Function to filter data and update the table
function filterAndRefreshTable() {
    d3.json(url).then(function (properties) {
        const filteredData = filterData(properties);
        updateTable(filteredData);

        // After updating the table, call the bargraph function
        bargraph(filteredData);
    });
};

// Function to create a bar graph
function bargraph(data) {
    // Extracting data for plot
    let prices = data.map(object => parseFloat(object.price));
    let bedrooms = data.map(object => parseFloat(object.bedrooms));
    let addresses = data.map(object => object.streetaddress); // Add addresses data

    // Create trace for Plotly with custom hover text
    let trace1 = {
        x: prices,
        y: bedrooms,
        text: addresses, // Set custom hover text (addresses in this case)
        hoverinfo: "text+y", // Show custom text and y-value in hover info
        name: "table",
        type: "bar",
    };

    // Data array
    let plotData = [trace1];

    // Apply a title to the layout and add axis labels
    let layout = {
        title: "Bar Chart",
        margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 100
        },
        xaxis: {
            title: 'Prices' // X-axis label
        },
        yaxis: {
            title: 'Bedrooms' // Y-axis label
        }
    };

    // If the graph div already exists, update the existing graph
    if (document.getElementById('bar')) {
        Plotly.react('bar', plotData, layout);
    } else {
        // Create the Plotly plot
        Plotly.newPlot("bar", plotData, layout);
    }
}

// Function to filter data and update the table
function filterAndRefreshTable() {
    d3.json(url).then(function (properties) {
        const filteredData = filterData(properties);
        updateTable(filteredData);

        // After updating the table, call the bargraph function
        bargraph(filteredData);
    });
}

// Function to reset the initial values
function resetInitialValues() {
    // Resetting initial values logic
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