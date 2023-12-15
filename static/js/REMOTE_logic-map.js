  // Creating our initial map object:
// We set the longitude, latitude, and starting zoom level.
// This gets inserted into the div with an id of "map".
let myMap = L.map("map", {
  center: [36.78,-119.42],
  zoom: 6
});

// Adding a tile layer (the background map image) to our map:
// We use the addTo() method to add objects to our map.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Use d3 to read the JSON file.
  d3.json("http://127.0.0.1:5000/").then((data) => {
    console.log("Data: ",data); // Output the array of data
    //Create array with Latitude and longitude
    // let coordinates = data.map(d => [d.latitude, d.longitude]);
    let coordinates = data.slice(0, 20).map(d => [d.latitude, d.longitude]);
    console.log("coordinates:", coordinates); // Output the array of coordinates
    
    //Create Markers for addresses
    coordinates.forEach(coord => {
      L.marker(coord)
      .bindPopup(`<br>${data.streetaddress}</br><br> ${data.zipcode}</br>`)
      .addTo(myMap);

    });
  });
  
// Function to update map markers based on filtered data
  function updateMapMarkers(filteredProperties) {
      // Clear previous markers from the map
      myMap.eachLayer(function (layer) {
          if (layer instanceof L.Marker) {
              myMap.removeLayer(layer);
          }
      });

    // Create markers for filtered properties
    filteredProperties.forEach(property => {
        let { latitude, longitude, streetaddress, zipcode } = property;
        L.marker([latitude, longitude])
            .bindPopup(`<br>${streetaddress}</br><br>${zipcode}</br>`)
            .addTo(myMap);
    });
}

// Function to filter data and update the table and map
function filterAndRefreshTable() {
    d3.json(url).then(function (properties) {
        const filteredData = filterData(properties);
        updateTable(filteredData);
        updateMapMarkers(filteredData); 

        // After updating the table and map markers, call the bargraph function
        bargraph(filteredData);
    });
}

// Event listener for the button click event
filterBtn.addEventListener('click', function () {
    // Call the filter table and map markers after clicking the apply button
    filterAndRefreshTable();
});

// Event listener for the dropdown change event
cityDropdown.addEventListener('change', function () {
    // Reset the initial values when the city changes
    resetInitialValues();

    // Call filter and refresh table and map markers
    filterAndRefreshTable();
});

// Call the init function to initialize the page
init();