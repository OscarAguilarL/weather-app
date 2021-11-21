import weather from '../data/current-weather.js';
import { formatDate } from './utils/format-date.js';

const { name: city, d } = weather;

const setCurrentCity = ($el, city) => {
    $el.textContent = city;
};

const setCurrentDate = ($el) => {
    const date = new Date();
    $el.textContent = formatDate(date);
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
    // background
};

export const currentWeather = () => {
    configCurrentWeather(weather);
};
