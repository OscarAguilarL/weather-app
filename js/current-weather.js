// import weather from '../data/current-weather.js';
import { WEATHER_CONDITION_CODES } from './constants.js';
import { getLatLon } from './geolocation.js';
import { getCurrentWeather } from './services/weather.js';
import { formatDate, formatTemp } from './utils/format-data.js';

// const city = weather.name;
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

const showCurrentWeather = ($app, $loader) => {
    $app.hidden = false;
    $loader.hidden = true;
};

const configCurrentWeather = (weather) => {
    const $app = document.querySelector('#app');
    const $loading = document.querySelector('#loading');
    // loader
    showCurrentWeather($app, $loading);
    // date
    const $currentWeatherDate = document.querySelector('#current-weather-date');
    setCurrentDate($currentWeatherDate);
    // city
    const $currentWeatherCity = document.querySelector('#current-weather-city');
    setCurrentCity($currentWeatherCity, weather.name);
    // temp
    const $currentWeatherTemp = document.querySelector('#current-weather-temp');
    const { temp } = weather.main;
    setCurrentTemp($currentWeatherTemp, temp);
    // background
    const sunriseTime = new Date(weather.sys.sunrise * 1000);
    const sunsetTime = new Date(weather.sys.sunset * 1000);
    const conditionCode = String(weather.weather[0].id).charAt(0);
    setBackground($app, conditionCode, solarStatus(sunsetTime, sunriseTime));
};

export const currentWeather = async () => {
    const { lat, lon, error } = await getLatLon();
    const { error: cwError, data } = await getCurrentWeather(lat, lon);

    if (error) return console.error('Error:', error);
    if (cwError) return console.error('Error:', cwError);

    configCurrentWeather(data);
};
