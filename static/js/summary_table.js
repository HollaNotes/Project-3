let url = "https://raw.githubusercontent.com/HollaNotes/Project-3/main/static/data/realEstate_data.json";

let city_i = document.getElementById('city');
let county_i = document.getElementById('county');
let price_i = document.getElementById('price');
let sqft_i = document.getElementById('sqft');
let price_sqt_i = document.getElementById('price_sqt_i');

    
function sumtbl(properties) {
    d3.json(url).then(function(data){
        // Set variable for metadata of samples
        let city = data.city;
        let county = data.county;
        let price = data.price;
        let sqft = data.livingarea;
        let price_sqft = data.pricepersquarefoot;
        console.log("hellp")
        
        






})};

function avg(input) {
    let total = 0;
    for (let i = 0; i < input.length; i++) {
        total += input[i];
    }
    let meanValue = total / input.length;
    return meanValue;

}