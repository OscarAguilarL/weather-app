import weather from '../data/current-weather.js';
import { WEATHER_CONDITION_CODES } from './constants.js';
import { getCurrentPosition } from './geolocation.js';
import { formatDate, formatTemp } from './utils/format-data.js';

const city = weather.name;
// WEATHER_CONDITION_CODES[]
// String(weather.weather[0].id).charAt(0)

const setCurrentCity = ($el, city) => {
    $el.textContent = city;
};

const setCurrentDate = ($el) => {
    const date = new Date();
    $el.textContent = formatDate(date);
};

const setCurrentTemp = ($el, temp) => {
    $el.textContent = formatTemp(temp);
};

const solarStatus = (sunsetTime, sunriseTime) => {
    const currentHours = new Date().getHours();
    const sunsetHours = sunsetTime.getHours();
    const sunriseHours = sunriseTime.getHours();

    if (currentHours > sunsetHours || currentHours < sunriseHours) {
        return 'night';
    } else {
        return 'morning';
    }
};

const setBackground = ($el, conditionCode, solarStatus) => {
    const weatherType = WEATHER_CONDITION_CODES[conditionCode];
    const size = window.matchMedia('(-webkit-min-device-pixel-ratio: 2').matches
        ? '@2x'
        : '';
    $el.style.backgroundImage = `url(./images/${solarStatus}-${weatherType}${size}.jpg)`;
};

const configCurrentWeather = (weather) => {
    // loader
    // date
    const $currentWeatherDate = document.querySelector('#current-weather-date');
    setCurrentDate($currentWeatherDate);
    // city
    const $currentWeatherCity = document.querySelector('#current-weather-city');
    setCurrentCity($currentWeatherCity, city);
    // temp
    const $currentWeatherTemp = document.querySelector('#current-weather-temp');
    const { temp } = weather.main;
    setCurrentTemp($currentWeatherTemp, temp);
    // background
    const $app = document.querySelector('#app');
    const sunriseTime = new Date(weather.sys.sunrise * 1000);
    const sunsetTime = new Date(weather.sys.sunset * 1000);
    const conditionCode = String(weather.weather[0].id).charAt(0);
    setBackground($app, conditionCode, solarStatus(sunsetTime, sunriseTime));
};

export const currentWeather = () => {
    getCurrentPosition();
    configCurrentWeather(weather);
};
