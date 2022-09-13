const apiKey = '5e91cc2d11f23d6b9e2b68d9e5e55a0d'

let userLocation = $('#city-search')
let searchSubmit = $('#search-btn')

let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userLocation}&APPID=${apiKey}`;

function getWeather(event){
    event.preventDefault();
    let userCity = userLocation.val();
    // console.log(userCity);
    location.replace('./index.html?'+`q=${userCity}`)
    // fetch(apiUrl)
    // .then()
}




searchSubmit.on('click', getWeather)