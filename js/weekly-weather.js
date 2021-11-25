import { getWeeklyWeather } from './services/weather.js';
import { getLatLon } from './geolocation.js';
import { formatWeekList } from './utils/format-data.js';
import { createDOM } from './utils/dom.js';
import { createPeriodTime, periodTimeTemplate } from './period-time.js';

const tabPanelTemplate = (id) => {
    return `
    <div class="tabPanel" tabindex="0" aria-labelledby="tab-${id}">
        <div class="dayWeather" id="dayWeather-${id}">
            <ul style="color: white;" class="dayWeather-list" id="dayWeather-list-${id}">

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
    // const $container = document.querySelector('.weeklyWeather');
    const $container = document.querySelector('.tabs');
    weekList.forEach((day, index) => {
        const $panel = createTabPanel(index);
        $container.append($panel);
        day.forEach((weather, indexWeather) => {
            $panel.querySelector('.dayWeather-list').append(createPeriodTime(weather));
        });
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
