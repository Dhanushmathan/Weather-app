
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const fetchWeatherData = async (cityName) => {
  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
}

export default fetchWeatherData;