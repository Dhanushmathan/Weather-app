import React, { useState } from 'react'
import { useRef, useEffect } from 'react';
import sunnyImg from '../assets/img/sun.png';
import dummyImg from '../assets/img/default.png';
import cloudImg from '../assets/img/clouds.png';
import nightImg from '../assets/img/night.png';
import rainImg from '../assets/img/rain.png';
import winterImg from '../assets/img/winter.png';

const WeatherPopupBox = ({ city, setCity, weatherData, getWeather }) => {
    const [input, setInput] = useState(city);
    const [location, setLocation] = useState("");
    const [img, setImg] = useState(null);
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    const handleSearch = () => {
        getWeather(input);
        if (input.trim() === "" || input.length < 3) {
            alert("Please enter a location");
            return;
        }
        setLocation(input);
    };

    useEffect(() => {
        if (weatherData?.weather[0]?.main) {
            switch (weatherData.weather[0].main.toLowerCase()) {
                case "clear":
                    setImg(sunnyImg);
                    break;
                case "clouds":
                    setImg(cloudImg);
                    break;
                case "rain":
                    setImg(rainImg);
                    break;
                case "snow":
                    setImg(winterImg);
                    break;
                case "thunderstorm":
                    setImg("https://cdn-icons-png.flaticon.com/512/1146/1146869.png");
                    break;
                case "drizzle":
                    setImg("https://cdn-icons-png.flaticon.com/512/3076/3076129.png");
                    break;
                case "night":
                    setImg(nightImg);
                    break;
                case "mist":
                case "fog":
                    setImg("https://cdn-icons-png.flaticon.com/512/4005/4005901.png");
                    break;
                default:
                    setImg(dummyImg);
            }
        }
    }, [weatherData]);

    return (
        <div className="flex flex-col mt-14 justify-center items-center px-4">
            <div className="flex items-center flex-col w-full max-w-md">
                <div className="relative w-full">
                    <input
                        ref={inputRef}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSearch();
                            }
                        }}
                        type="text"
                        className="w-full px-4 py-2 rounded-full ring-2 ring-blue-700 border-none outline-none text-white placeholder-gray-400"
                        placeholder="Enter a weather location"
                    />
                    <button>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-white cursor-pointer"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            onClick={handleSearch}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-4.35-4.35M16.65 10.65a6 6 0 11-12 0 6 6 0 0112 0z"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            {weatherData && (
                <div className="mt-10 flex flex-col items-center bg-gray-800/50 text-white rounded-lg p-4 w-full max-w-md">
                    <h3 className="font-semibold text-lg md:text-xl">{weatherData?.name}</h3>
                    <div className="flex flex-row items-center mt-4 space-x-6">
                        <img src={img} alt="Weather Icon" className="w-16 h-16 md:w-20 md:h-20" />
                        <h3 className="font-bold text-4xl md:text-5xl mt-2">{weatherData?.main?.temp}°</h3>
                    </div>
                    <h3 className="mt-2 font-semibold text-lg md:text-xl">{weatherData?.weather[0].main}</h3>
                    <div className="grid grid-cols-3 gap-4 mt-4 text-sm md:text-base">
                        <p className="font-semibold">
                            Temp: <br /> {weatherData?.main?.temp}
                        </p>
                        <p className="font-semibold">
                            Humidity: <br /> {weatherData?.main?.humidity} %
                        </p>
                        <p className="font-semibold">
                            Wind Speed: <br /> {weatherData?.wind?.speed} km/h
                        </p>
                        <p className="font-semibold">
                            Feels like: <br /> {weatherData?.main?.feels_like}
                        </p>
                        <p className="font-semibold">
                            Visibility: <br /> {weatherData?.visibility}
                        </p>
                        <p className="font-semibold">
                            Pressure: <br /> {weatherData?.main?.pressure}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default WeatherPopupBox;