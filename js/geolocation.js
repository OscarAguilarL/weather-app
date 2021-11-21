const geolocationSupport = () => 'geolocation' in navigator;

export const getCurrentPosition = () => {
    if (!geolocationSupport())
        throw new Error('No hay soporte de geolocalización en tu navegador');

    navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        console.log({ latitude, longitude });
    });
};
