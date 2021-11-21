const DEFAULT_CONFIG = {
    day: 'numeric',
    weekday: 'long',
    month: 'long',
};

export const formatDate = (date, config = DEFAULT_CONFIG) =>
    new Intl.DateTimeFormat('es', config).format(date);
