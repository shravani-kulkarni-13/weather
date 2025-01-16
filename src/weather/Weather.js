import React, { useEffect, useState } from 'react'
const Weather = () => {
    const [weatherData, setweatherData] = useState(null);
    const [forecasts, setforecast] = useState(null)
    const [searchWeather, setsearchWeather] = useState("");
    const [loading, setloading] = useState(true);


    const api_key = "83c7809a7920468c41f402e53fb162d8";
        async function currentWeather(city) {
            try{
                setloading(true);
                const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`);
                const data = await res.json(); 
                setweatherData(data);
                setloading(false);
            }catch(e) {}
        }
        async function forecastofthreedays(city) {
            try{
                const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api_key}`)
                const forecastData = await res.json();
                setforecast(forecastData);
                setloading(false);
            }catch(e) {}
        }
        
        useEffect(()=> {
            currentWeather('Latur');
            forecastofthreedays('Latur');
        },[]);
        const handleTheSearching = () => {
            if(searchWeather) {
                currentWeather(searchWeather);
                forecastofthreedays(searchWeather);
                setsearchWeather("");
            }
    } 
    const weatherIcons = (icons) => {
        switch(icons) {
            case 'Clear' :  
                return '/images/clear.png';
            case 'Clouds' : 
                return '/images/cloudy.png';
            case 'Rain' : 
                return '/images/rainy.png';
            case 'Snow' : 
                return '/images/snow.png';
            case 'Thunderstorm' : 
                return '/images/storm.png';
            case 'Mist' : 
            case 'Fog' : 
                return '/images/fog.png';
            case 'Haze' : 
                return '/images/haze.png'
            default : 
                return '/images/clear.png';
        }
    } 
    if(loading === true) {
        return <img src="/loading.gif" alt="" />
    } 
    const dailyForecast = forecasts ? forecasts.list.filter((_,index)=> index % 15 === 0) : "";
  return (
    <>
    <div className="bg-no-repeat bg-cover bg-center bg-black bg-opacity-50 h-screen text-white relative">
    <div className="absolute inset-0">
        <video className="w-full h-full object-cover"
            src="/images/weatherAnime.mp4"
            autoPlay
            loop
            muted
            playsInline>
        </video>
    </div>
        <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>
        <div className="relative z-10 p-4">
            <input type="search" value={searchWeather} onChange={(e)=> setsearchWeather(e.target.value)} placeholder='Search weather' className='rounded-xl px-3 mx-3 text-black py-2 my-4 w-2/4' />
            <button className='border-solid border-2 rounded-3xl px-3 py-2' onClick={handleTheSearching}><i class="fa-solid fa-magnifying-glass"></i></button>

            {weatherData && weatherData.weather && weatherData.weather.length > 0 && (
                <div className="flex items-center space-x-4 mt-6">
                    <img
                        src={weatherIcons(weatherData.weather[0].main)}
                        alt=""
                        className="w-28 h-28"/>
                    <div>
                        <h2 className="text-white text-5xl">{weatherData.name}</h2>
                        <h3 className="text-white text-3xl py-1">{weatherData.weather[0].main}</h3>
                        <p className="text-white text-7xl">{weatherData.main.temp}°C</p>
                    </div>
                </div>
            )}
            
            {forecasts && forecasts.list &&  (
                <div className='mt-6'>
                    <h1 className='text-xl mx-5 my-8'>Forecast of 3 days</h1>
                    {dailyForecast.map((value, index)=> (
                        <div key={index} className="flex items-center space-x-4 mt-6">
                            <img src={`https://openweathermap.org/img/wn/${value.weather[0].icon}.png`} alt="" />

                            <h1>{value.dt_txt.split(" ")[0]}</h1>
                            <h3>{value.weather[0].main}</h3>
                            <p>{value.main.temp}°C</p>
                            <p>{value.wind.speed}</p>
                            <p>{value.wind.deg}</p>
                        </div>
                    ))}
                </div>
            )}


        </div>
    </div>        
    </>
  )
}

export default Weather
