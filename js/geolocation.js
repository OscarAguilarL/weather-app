const geolocationSupport = () => 'geolocation' in navigator;

const DEFAULT_OPTIONS = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 100000,
};

export const getCurrentPosition = (options = DEFAULT_OPTIONS) => {
    if (!geolocationSupport())
        throw new Error('No hay soporte de geolocalización en tu navegador');

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve(position);
            },
            () => {
                reject('No se ha podido obtener la ubicación');
            },
            options
        );
    });
};

export const getLatLon = async (options = DEFAULT_OPTIONS) => {
    try {
        const { coords } = await getCurrentPosition(options);
        const { latitude, longitude } = coords;

        return { lat: latitude, lon: longitude, error: false };
    } catch (err) {
        return { lat: null, lon: null, error: err };
    }
};
