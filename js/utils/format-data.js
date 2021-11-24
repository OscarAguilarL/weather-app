const DEFAULT_CONFIG = {
    day: 'numeric',
    weekday: 'long',
    month: 'long',
};

const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

export const formatDate = (date, config = DEFAULT_CONFIG) =>
    capitalizeFirstLetter(new Intl.DateTimeFormat('es', config).format(date));

export const formatTemp = (value) => {
    return `${Math.trunc(value)}°`;
};

export const formatWeekList = (rawData) => {
    const today = new Date();
    const todayDay = today.getDay();
    const weekList = [];
    let day = todayDay;
    let dayList = [];

    rawData.forEach((item) => {
        const itemDate = new Date(item.dt * 1000);
        const itemDay = itemDate.getDay();
        if (itemDay > day) {
            weekList.push(dayList);
            dayList = [];
            day++;
        }
        if (itemDay === 0 && day === 6) {
            weekList.push(dayList);
            dayList = [];
            day = 0;
        }
        dayList.push(item);
    });

    weekList.push(dayList);
    return weekList;
};
