import { getWeeklyWeather } from './services/weather.js';
import { getLatLon } from './geolocation.js';
import { formatWeekList } from './utils/format-data.js';

const configWeeklyWeather = (weather) => {
    console.log(weather);
};

export const weeklyWeather = async () => {
    const { lat, lon, error } = await getLatLon();
    const { error: wError, data } = await getWeeklyWeather(lat, lon);

    if (error) return console.error('Error:', error);
    if (wError) return console.error('Error:', cwError);

    const weekList = formatWeekList(data.list);
    configWeeklyWeather(weekList);
};
