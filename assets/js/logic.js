const apiKey = '5e91cc2d11f23d6b9e2b68d9e5e55a0d'

let userLocation = $('#city-search');
let searchSubmit = $('#search-btn');
let weatherToday = $('#weather-today');
let todayDisplay = $('#display-today');

function getWeather(event){
    event.preventDefault();
    $('#display-today p').remove();
    let userCity = userLocation.val();
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&APPID=${apiKey}&units=imperial`;
    // console.log(userCity);
    // location.replace('./index.html?'+`q=${userCity}`)
    fetch(apiUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(results){
        let weatherIcon = results.weather[0].icon;
        let iconUrl = `http://openweathermap.org/img/wn/${weatherIcon}.png`
        let iconImage = $('<img>',{
            src: `${iconUrl}`,
            alt: 'weather-icon'
        });
        let temp = $('<p>').text(`Temp: ${results.main.temp}°F`);
        let humid = $('<p>').text(`Humidity: ${results.main.humidity} %`);
        let windSpeed = $('<p>').text(`Wind: ${results.wind.speed} MPH`);
        weatherToday.text(`${results.name} (${moment().format('L')})`);
        weatherToday.append(iconImage); 
        todayDisplay.append(temp, windSpeed, humid);
        todayDisplay.attr('class', 'border border-dark');

    })
    
}




// console.log(results);
// console.log(results.name);
// console.log(results.main.humidity);
// console.log(results.wind.speed);
// console.log(results.weather[0].icon)
searchSubmit.on('click', getWeather)