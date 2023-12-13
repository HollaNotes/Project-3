const url = "https://raw.githubusercontent.com/HollaNotes/Project-3/main/static/data/realEstate_data.json";

function summary_table() {
    // Fetch the JSON data
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log("Data: ", data);

            // Extracting data for plot
            let prices = data.map(object => parseFloat(object.price));
            let bedrooms = data.map(object => parseFloat(object.bedrooms));
            let pricepersquarefoot = data.map(object => parseFloat(object.pricepersquarefoot));
            let event = data.map(object => parseFloat(object.event));
            let yearbuilt = data.map(object => parseFloat(object.yearbuilt));
            let zipcode = data.map(object => parseFloat(object.zipcode));
            let streetaddress = data.map(object => parseFloat(object.streetaddress));
            let countyid = data.map(object => parseFloat(object.countyid));
            let sqfoot = data.map(object => parseFloat(object.pricepersquarefoot));
            let county = data.map(object => parseFloat(object.county));

            // Create trace for Plotly
            let trace1 = {
                x: prices,
                y: bedrooms,
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

            // Create the Plotly plot
            Plotly.newPlot("bar", plotData, layout);
        })
        .catch(error => console.error("Error fetching data:", error));
}

summary_table();