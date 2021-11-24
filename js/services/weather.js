import { API_KEY, BASE_API } from '../constants.js';

export const getCurrentWeather = async (lat, lon) => {
    const resp = await fetch(
        `${BASE_API}/weather?units=metric&lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );

    if (!resp.ok) {
        return {
            error: resp.statusText,
            data: null,
        };
    }

    const data = await resp.json();

    return {
        error: null,
        data,
    };
};

export const getWeeklyWeather = async (lat, lon) => {
    const resp = await fetch(
        `${BASE_API}/forecast?units=metric&lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );

    if (!resp.ok) {
        return {
            error: resp.statusText,
            data: null,
        };
    }

    const data = await resp.json();

    return {
        error: null,
        data,
    };
};
