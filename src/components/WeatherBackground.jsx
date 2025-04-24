import React, { useEffect, useState } from 'react';
import clouds from '../assets/videos/default.mp4';
import sunnyVideo from '../assets/videos/sunny.mp4';
import rainVideo from '../assets/videos/rain.mp4';
import nightVideo from '../assets/videos/night.mp4';
import winterVideo from '../assets/videos/winter.mp4';

const WeatherBackground = ({ weatherData }) => {

    const [videoSrc, setVideoSrc] = useState(clouds);

    useEffect(() => {
        if (weatherData?.weather[0]?.main) {
            switch (weatherData.weather[0].main.toLowerCase()) {
                case "clear":
                    setVideoSrc(sunnyVideo);
                    break;
                case "clouds":
                    setVideoSrc(clouds);
                    break;
                case "rain":
                    setVideoSrc(rainVideo);
                    break;
                case "snow":
                    setVideoSrc(winterVideo);
                    break;
                case "night":
                    setVideoSrc(nightVideo);
                    break;
                default:
                    setVideoSrc(clouds);
            }
        }
    }, [weatherData]);

    return (
        <video src={videoSrc} typeof='video/mp4' autoPlay muted loop className='fixed top-0 left-0 w-full h-full object-cover z-[-1]'>
            
        </video>
    )
}

export default WeatherBackground;