import weather from '../data/current-weather.js';

const { name: city } = weather;

const setCurrentCity = ($el, city) => {
    $el.textContent = city;
};

const configCurrentWeather = (weather) => {
    // loader
    // date
    // city
    const $currentWeatherCity = document.querySelector('#current-weather-city');
    setCurrentCity($currentWeatherCity, city);
    // temp
    // background
};

export const currentWeather = () => {
    configCurrentWeather(weather);
};
