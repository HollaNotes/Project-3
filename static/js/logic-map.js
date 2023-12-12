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
  d3.json("static/data/data.json").then((data) => {
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
    // coordinates.forEach(d => {
    //   let { latitude, longitude, streetaddress } = d;
    //   L.marker([latitude, longitude]).addTo(map)
    //   .bindPopup(streetaddress);
    });
  });