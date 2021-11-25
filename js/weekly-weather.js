import { getWeeklyWeather } from './services/weather.js';
import { getLatLon } from './geolocation.js';
import { formatWeekList } from './utils/format-data.js';
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
    weekList.forEach((day, index) => {
        const $panel = createTabPanel(index);
        $container.append($panel);
        day.forEach((weather, indexWeather) => {
            $panel
                .querySelector('.dayWeather-list')
                .append(createPeriodTime(weather));
        });
    });
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
