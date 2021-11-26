import { getWeeklyWeather } from './services/weather.js';
import { getLatLon } from './geolocation.js';
import { formatTemp, formatWeekList } from './utils/format-data.js';
import { createDOM } from './utils/dom.js';
import { createPeriodTime } from './period-time.js';
import { draggable } from './draggable.js';

const tabPanelTemplate = (id) => {
    return `
    <div class="tabPanel" tabindex="0" aria-labelledby="tab-${id}">
        <div class="dayWeather" id="dayWeather-${id}">
            <ul class="dayWeather-list" id="dayWeather-list-${id}">

            </ul>
        </div>
    </div>
    `;
};

const createTabPanel = (index) => {
    const $panel = createDOM(tabPanelTemplate(index));
    if (index > 0) {
        $panel.hidden = true;
    }
    return $panel;
};

const configWeeklyWeather = (weekList) => {
    const $container = document.querySelector('.tabs');
    const extraWeatherInfo = [];
    let infoIndex = 0;

    weekList.forEach((day, index) => {
        const $panel = createTabPanel(index);
        $container.append($panel);
        day.forEach((weather, indexWeather) => {
            extraWeatherInfo.push(weather);

            $panel
                .querySelector('.dayWeather-list')
                .append(createPeriodTime(weather, infoIndex));
            const dayList = document.querySelectorAll('.dayWeather-item');
            dayList.forEach((element) => {
                element.addEventListener('click', getWeatherTabs);
            });
            infoIndex++;
        });
    });

    function getWeatherTabs(event) {
        const dayList = document.querySelectorAll('.dayWeather-item');
        const {
            wind: { speed },
            main: { humidity, temp_max, temp_min },
        } = extraWeatherInfo[event.currentTarget.dataset.id];
        const $showDataFeatures = document.querySelector('.weather-features');

        dayList.forEach((item) => item.classList.remove('is-selected'));
        event.currentTarget.classList.add('is-selected');

        $showDataFeatures.innerHTML = `
            <p class="weather-max">Max: <strong>${formatTemp(temp_max)}</strong></p>
            <p class="weather-min">Min: <strong>${formatTemp(temp_min)}</strong></p>
            <p class="weather-wind">Viento: <strong>${speed} km/h</strong></p>
            <p class="weather-humidity">Humedad: <strong>${humidity}%</strong></p>
        `;
    }
};

export const weeklyWeather = async () => {
    const $container = document.querySelector('.weeklyWeather');
    const { lat, lon, error } = await getLatLon();
    const { error: wError, data } = await getWeeklyWeather(lat, lon);

    if (error) return console.error('Error:', error);
    if (wError) return console.error('Error:', cwError);

    const weekList = formatWeekList(data.list);

    configWeeklyWeather(weekList);
    draggable($container);
};
