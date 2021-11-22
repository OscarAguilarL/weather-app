const $tabContainer = document.querySelector('#tabs');
const $tabList = $tabContainer.querySelectorAll('.tab');

const today = new Date();
let weekday = today.getDay();

const week = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sabado',
];

const nextDay = (day) => (day === 6 ? 0 : day + 1);

$tabList.forEach((tab, index) => {
    if (index === 0) {
        tab.textContent = 'Hoy';
        weekday = nextDay(weekday);
        return false;
    }
    tab.textContent = week[weekday];
    weekday = nextDay(weekday);
});
