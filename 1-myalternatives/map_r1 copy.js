  // Use d3 to read the JSON file.
  d3.json("static/data/data.json").then((data) => {
    console.log("Data: ",data); // Output the array of data
    //Create array with Latitude and longitude
    // let coordinates = data.map(d => [d.latitude, d.longitude]);
    let coordinates = data.slice(0, 50).map(d => [d.latitude, d.longitude]);
    console.log("coordinates:", coordinates); // Output the array of coordinates
    //Center map
    let myMap = L.map('map').setView([36.78,-119.42],6);
    // Adding a tile layer (the background map image) to our map:
    // We use the addTo() method to add objects to our map.
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
    }).addTo(myMap);
    //Create Markers for addresses
    coordinates.forEach(coord => {
      L.marker(coord)
      .bindPopup(`<br>${data.streetaddress}</br><br> ${data.zipcode}</br>`)
      .addTo(myMap);
    });
  });