import { createDOM } from './utils/dom.js';
import { formatDate, formatTemp } from './utils/format-data.js';

export const periodTimeTemplate = ({
    temp,
    date,
    icon,
    description,
    index,
}) => {
    return `
    <li class="dayWeather-item" data-id="${index}">
        <span class="dayWeather-time is-selected">${date}</span>
        <img class="dayWeather-icon" width="48" height="48" src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" rain="">
        <span class="dayWeather-temp">${temp}</span>
    </li>
    `;
};

export const createPeriodTime = (weather, index) => {
    const dateConfig = {
        hour: 'numeric',
        hour12: true,
    };
    const temp = formatTemp(weather.main.temp);
    const date = formatDate(new Date(weather.dt * 1000), dateConfig);
    const config = {
        temp,
        date,
        icon: weather.weather[0].icon,
        description: weather.weather[0].icon,
        index,
    };
    return createDOM(periodTimeTemplate(config));
};
