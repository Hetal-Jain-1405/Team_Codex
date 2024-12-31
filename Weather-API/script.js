const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function getWeatherByCity(cityName) {
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1`;
    const geoResponse = await fetch(geoUrl);
    const geoData = await geoResponse.json();

    if (geoData.results && geoData.results.length > 0) {
        const latitude = geoData.results[0].latitude;
        const longitude = geoData.results[0].longitude;


        const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code`;
        const weatherResponse = await fetch(apiUrl);
        const weatherData = await weatherResponse.json();

        console.log(weatherData);

        document.querySelector(".city").innerHTML = geoData.results[0].name;


       document.querySelector(".temp").innerHTML = weatherData.current.apparent_temperature + "°C";
       document.querySelector(".humidity").innerHTML = weatherData.current.relative_humidity_2m + "%";
       document.querySelector(".wind").innerHTML = weatherData.current.wind_speed_10m + " km/hr";

       if(weatherData.current.weather_code==0){
        weatherIcon.src = "images/clear.png";
       }
       if(weatherData.current.weather_code==1||weatherData.current.weather_code==2||weatherData.current.weather_code==3){
        weatherIcon.src = "images/clouds.png";
       }
       if(weatherData.current.weather_code==51||weatherData.current.weather_code==53||weatherData.current.weather_code==55){
        weatherIcon.src = "images/drizzle.png";
       }
       if(weatherData.current.weather_code==80||weatherData.current.weather_code==81||weatherData.current.weather_code==82||weatherData.current.weather_code==61||weatherData.current.weather_code==63||weatherData.current.weather_code==65){
        weatherIcon.src = "images/rain.png";
       }
       if(weatherData.current.weather_code==85||weatherData.current.weather_code==86||weatherData.current.weather_code==77||weatherData.current.weather_code==71||weatherData.current.weather_code==73||weatherData.current.weather_code==75){
            weatherIcon.src = "images/snow.png";
        }
       if(weatherData.current.weather_code==95||weatherData.current.weather_code==96||weatherData.current.weather_code==99){
            weatherIcon.src = "images/thunder.png";
        }
    } else {
        console.error("City not found");
    }
}
searchBtn.addEventListener("click", ()=>{
    getWeatherByCity(searchBox.value);

})
