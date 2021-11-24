import { getWeeklyWeather } from './services/weather.js';
import { getLatLon } from './geolocation.js';
import { formatWeekList } from './utils/format-data.js';
import { createDOM } from './utils/dom.js';

const configWeeklyWeather = (weekList) => {
    const $container = document.querySelector('.weeklyWeather');
    weekList.forEach((item) => {
        const $el = createDOM('<h2>Hola mundo</h2>');
        $container.append($el);
    });
};

export const weeklyWeather = async () => {
    const { lat, lon, error } = await getLatLon();
    const { error: wError, data } = await getWeeklyWeather(lat, lon);

    if (error) return console.error('Error:', error);
    if (wError) return console.error('Error:', cwError);

    const weekList = formatWeekList(data.list);

    configWeeklyWeather(weekList);
};
