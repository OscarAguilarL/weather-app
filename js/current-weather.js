import weather from '../data/current-weather.js';
import { formatDate, formatTemp } from './utils/format-date.js';

const { name: city } = weather;

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
};

export const currentWeather = () => {
    configCurrentWeather(weather);
};
