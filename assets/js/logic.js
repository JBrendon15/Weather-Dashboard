const apiKey = '5e91cc2d11f23d6b9e2b68d9e5e55a0d'

let userLocation = $('#city-search');
let searchSubmit = $('#search-btn');
let weatherToday = $('#weather-today');
let todayDisplay = $('#display-today');
let forecastContainer = $('#yugioh-cards');

//this function gets the weather information for the current day and creates elements dynamically to the html 
function getWeather(event){
    event.preventDefault();
    $('#display-today p').remove();
    let userCity = userLocation.val();
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&APPID=${apiKey}&units=imperial`;
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
        let windSpeed = $('<p>').text(`Wind: ${results.wind.speed} MPH`);
        let humid = $('<p>').text(`Humidity: ${results.main.humidity} %`);
        weatherToday.text(`${results.name} (${moment().format('L')})`);
        weatherToday.append(iconImage); 
        todayDisplay.append(temp, windSpeed, humid);
        todayDisplay.attr('class', 'border border-dark p-3');
        getFiveDay();
    })   
}
//this function pulls the weather information we need for the next five days and creates the elements dynamically on the html
function getFiveDay(){
    let userCity = userLocation.val();
    let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${userCity}&appid=${apiKey}&units=imperial`;
    fetch(apiUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(results){
        forecastContainer.empty();
        let fiveDayArr = [];
        fiveDayArr.push(results.list[7]);
        fiveDayArr.push(results.list[15]);
        fiveDayArr.push(results.list[23]);
        fiveDayArr.push(results.list[31]);
        fiveDayArr.push(results.list[39]);
        console.log(fiveDayArr);
        for(let i = 0; i < fiveDayArr.length; i++){
            let temp = $('<p>').text(`Temp: ${fiveDayArr[i].main.temp}°F`);
            let windSpeed = $('<p>').text(`Wind: ${fiveDayArr[i].wind.speed} MPH`);
            let humid = $('<p>').text(`Wind: ${fiveDayArr[i].main.humidity} %`);
            let weatherIcon = fiveDayArr[i].weather[0].icon;
            let iconUrl = `http://openweathermap.org/img/wn/${weatherIcon}.png`
            let iconImage = $('<img>',{
                src: `${iconUrl}`,
                alt: 'weather-icon'
            })
            let dateArr = fiveDayArr[i].dt_txt.split(" ")[0].split('-');
            let cardName = $('<h5>').text(`${dateArr[1]}/${dateArr[2]}/${dateArr[0]}`);
            cardName.attr('class','card-title');
            let cardBody = $('<div>').attr('class', 'card-body bg-dark text-white');
            let cardContainer = $('<div>',{
                class: 'card',
                style: 'width: 18rem;'
            });
            cardBody.append(cardName, iconImage, temp, windSpeed, humid);
            cardContainer.append(cardBody);
            forecastContainer.append(cardContainer);
        }
    })
}    

searchSubmit.on('click', getWeather)