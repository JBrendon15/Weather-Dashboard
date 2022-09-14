const apiKey = '5e91cc2d11f23d6b9e2b68d9e5e55a0d'

let userLocation = $('#city-search');
let searchSubmit = $('#search-btn');
let weatherToday = $('#weather-today');
let todayDisplay = $('#display-today');
let forecastContainer = $('#yugioh-cards');
let searchCol = $('#search-panel');

//this function gets the weather information for the current day and creates elements dynamically to the html 
function getWeather(event){
    event.preventDefault();
    $('#display-today p').remove();
    let userCity = userLocation.val();
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&APPID=${apiKey}&units=imperial`;
    fetch(apiUrl)
    .then(function(response){
        if(response.status !== 200){
            alert('Please enter a valid city name');
        }
        else{
            return response.json();
        }
    })
    .then(function(results){
        let weatherIcon = results.weather[0].icon;
        let iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}.png`
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
        createHistory();
    })    
    }; 
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
        for(let i = 0; i < fiveDayArr.length; i++){
            let temp = $('<p>').text(`Temp: ${fiveDayArr[i].main.temp}°F`);
            let windSpeed = $('<p>').text(`Wind: ${fiveDayArr[i].wind.speed} MPH`);
            let humid = $('<p>').text(`Wind: ${fiveDayArr[i].main.humidity} %`);
            let weatherIcon = fiveDayArr[i].weather[0].icon;
            let iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}.png`
            let iconImage = $('<img>',{
                src: `${iconUrl}`,
                alt: 'weather-icon'
            })
            let dateArr = fiveDayArr[i].dt_txt.split(" ")[0].split('-');
            let cardName = $('<h5>').text(`${dateArr[1]}/${dateArr[2]}/${dateArr[0]}`);
            cardName.attr('class','card-title');
            let cardBody = $('<div>').attr('class', 'card-body bg-primary text-white');
            let cardContainer = $('<div>',{
                class: 'card',
                style: 'width: 18rem;'
            });
            cardBody.append(cardName, iconImage, temp, windSpeed, humid);
            cardContainer.append(cardBody);
            forecastContainer.append(cardContainer);
            userLocation.val("");
        }
    })
}
//this function saves the user search to the localstorage and I included an if condition to not have the same search be pushed into localstorage multiple times
function createHistory(){
    previousSearch = userLocation.val();
    searchHistory = JSON.parse(localStorage.getItem('allHistory')) || [];
    if(!searchHistory.includes(previousSearch.toLowerCase())){
        searchHistory.push(previousSearch.toLowerCase());
    }
    localStorage.setItem('allHistory', JSON.stringify(searchHistory));
}
//this function adds the previous searches as buttons on the left hand side of webpage
function addingButtons(){
    let savedSearches = JSON.parse(localStorage.getItem('allHistory'));
    for(let i = 0; i < savedSearches.length; i++){
        let historyButton = $('<button>').attr('class', 'col btn btn-light btn-block previous-search');
        historyButton.text(savedSearches[i]);
        searchCol.append(historyButton);
    }
}
//this adds an event listener to the parent div of the created buttons to set the search value equal to the text value of the button clicked to run the getWeather function
searchCol.on('click', '.previous-search', function(e){
    e.preventDefault();
    userLocation.val($(e.target).text());
    getWeather(e);
});
searchSubmit.on('click', getWeather);
$(document).ready(addingButtons);
// let previousSearch = $('<button>').attr('class', 'col btn btn-light btn-block previous-search');
