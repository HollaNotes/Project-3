// Adding a tile layer (the background map image) to our map:
// We use the addTo() method to add objects to our map.

// function createMap(streetAddress) {

//   // Create the tile layer that will be the background of our map.
//   let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//   });


//   // Create a baseMaps object to hold the streetmap layer.
//   let baseMaps = {
//     "Street Map": streetmap
//   };

//   // Create an overlayMaps object to hold the bikeStations layer.
//   let overlayMaps = {
//     "Address": streetAddress
//   };

//   // Create the map object with options.
//   let myMap = L.map("map", {
//     center: [36.78,-119.42],
//     zoom: 6
//   });
  
//   // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
//   L.control.layers(baseMaps, overlayMaps, {
//     collapsed: false
//   }).addTo(map);
// }

// function createMarkers(response) {

//   // Pull the "stations" property from response.data.
//   let addresses = response.data.streetAddress;

//   // Initialize an array to hold the bike markers.
//   let addressMarkers = [];

//   // Loop through the stations array.
//   for (let index = 0; index < stations.length; index++) {
//     let address = addresses[index];

//     // For each station, create a marker, and bind a popup with the station's name.
//     let addressMarkers = L.marker([data.lat, data.lon])
//       .bindPopup("<h3>" + data.streetAddress + "<h3><h3>Zip: " + data.zipcode + "</h3>");

//     // Add the marker to the bikeMarkers array.
//     addressMarkers.push(addressMarkers);
//   }

//   // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
//   createMap(L.layerGroup(addressMarkers));
// }

// Perform an API call to API to get the station information. Call createMarkers when it completes.
// d3.json("..Resources\JSON_filter6.json").then(createMarkers);
d3.json("..Resources\JSON_filter6.json", function(error, data) {
  if (error) {
    console.log(error);
    return;
  }
console.log(data);
});