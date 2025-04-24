import React, { useEffect, useState } from 'react'
import WeatherBackground from './components/WeatherBackground';
import WeatherPopupBox from './components/WeatherPopupBox';
import fetchWeatherData from './services/WeatherService';

const App = () => {

  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const getWeatherData = async (cityName) => {
    const data = await fetchWeatherData(cityName);
    setWeatherData(data);
    if (data && data.cod === 200) {
      setWeatherData(data);
    } else {
      alert("Location not found!!!");
      setWeatherData(null);
    }
  }

  useEffect(() => {
    if (city) {
      getWeatherData(city);
    }
  }, [city])

  return (
    <div className='font-poppins'>
      <WeatherBackground weatherData={weatherData} />
      <WeatherPopupBox city={city} setCity={setCity} weatherData={weatherData} getWeather={getWeatherData} />
    </div>
  )
}

export default App;