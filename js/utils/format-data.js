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
