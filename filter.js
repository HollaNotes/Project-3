let cityDropdown = document.getElementById('cityDropdown');
let filterBtn = document.getElementById('filter-btn');
let tableContainer = document.getElementById('filteredTableContainer');

// Initial values
let initialPriceMinEl = parseInt(document.getElementById('price-min').value);
let initialPriceMaxEl = parseInt(document.getElementById('price-max').value);
let initialBedroomMinEl = parseInt(document.getElementById('bedroom-min').value);
let initialBedroomMaxEl = parseInt(document.getElementById('bedroom-max').value);
let initialBathroomMinEl = parseInt(document.getElementById('bathroom-min').value);
let initialBathroomMaxEl = parseInt(document.getElementById('bathroom-max').value);

// Current values
let priceMinEl = initialPriceMinEl;
let priceMaxEl = initialPriceMaxEl;
let bedroomMinEl = initialBedroomMinEl;
let bedroomMaxEl = initialBedroomMaxEl;
let bathroomMinEl = initialBathroomMinEl;
let bathroomMaxEl = initialBathroomMaxEl;


// Store the local host as url
const url = "http://127.0.0.1:5000/";

// Function to initialize the page
function init(){
  d3.json(url).then(function(properties){

    // Set to store unique cities
    const uniqueCities = new Set();

    // Loop through the dataset and add unique options to the dropdown
    properties.forEach(property => {
      const city = property.city;

      // Check if the city is not already added
      if (!uniqueCities.has(city)) {
          uniqueCities.add(city);

          const option = document.createElement('option');
          option.value = city;
          option.text = city;
          cityDropdown.appendChild(option);
      };
  }); 
  
  filterAndRefreshTable();
});
};



function filterData(properties) {
  const selectedCity = cityDropdown.value;
  priceMinEl = parseInt(document.getElementById('price-min').value);
  priceMaxEl = parseInt(document.getElementById('price-max').value);
  bedroomMinEl = parseInt(document.getElementById('bedroom-min').value);
  bedroomMaxEl = parseInt(document.getElementById('bedroom-max').value);
  bathroomMinEl = parseInt(document.getElementById('bathroom-min').value);
  bathroomMaxEl = parseInt(document.getElementById('bathroom-max').value);

  return properties.filter(item => {
      const city = item.city;
      const price = parseInt(item.price);
      const bedroom = parseInt(item.bedrooms);
      const bathroom = parseInt(item.bathrooms);

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

    const table = document.createElement('table');
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
  d3.json(url).then(function(properties){
    const filteredData = filterData(properties);
    updateTable(filteredData);
});
};

// Function to reset the initial values
function resetInitialValues() {
  priceMinEl = initialPriceMinEl;
  priceMaxEl = initialPriceMaxEl;
  bedroomMinEl = initialBedroomMinEl;
  bedroomMaxEl = initialBedroomMaxEl;
  bathroomMinEl = initialBathroomMinEl;
  bathroomMaxEl = initialBathroomMaxEl;
};

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

// Show the inital page
init();