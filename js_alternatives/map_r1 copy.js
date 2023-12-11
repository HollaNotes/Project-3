// Use d3 to read the JSON file.
d3.json("Resources\JSON_filter6.json").then(function(data){
  console.log(data)
});

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


// data(streetAddress)
// //Show first 20 rows from the `streetAddress` dataset
//   leaflet(data = streetAddress[1:20,]) %>% addTiles() %>%
//     addMarkers(~long, ~lat, popup = ~as.character(streetAddress), label = ~as.character(streetAddress))

  // Define arrays to hold the created address marker.
// let addressMarkers = [];

// Looping through the address array, create markers for each filtered address, bind a popup containing its
// address City, Zip, bed, bath, price, yr built, and house type , and add it to the map.
// let marker_limit = 20;

// for (let i = 0; i < streetAddress.length; i++) {
//     let address = streetAddress[i];
//     L.marker(streetAddress.coordinates)
//       .bindPopup(`<h1>${address.streetAddress}</h1> <hr> <h3>Zip ${address.zipcode.toLocaleString()}</h3>`)
//       .addTo(myMap);
//   }