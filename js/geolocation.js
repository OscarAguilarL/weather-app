const geolocationSupport = () => 'geolocation' in navigator;

export const getCurrentPosition = () => {
    if (!geolocationSupport())
        throw new Error('No hay soporte de geolocalización en tu navegador');

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;

                resolve({ latitude, longitude });
            },
            () => {
                reject('No se ha podido obtener la ubicación');
            }
        );
    });
};
