// BRING IN THE DATA
// Get the samples endpoint
const url = "https://raw.githubusercontent.com/HollaNotes/Project-3/main/users_data.json";

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
    console.log("Data: ", data);
    
});    


