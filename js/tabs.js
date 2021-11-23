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

const handleSelectTabClick = (e) => {
    const $tabSelected = e.target;
    const { id } = $tabSelected;
    const $tabActive = document.querySelector('.tab[aria-selected="true"]');
    const $tabPanel = document.querySelector(`[aria-labelledby=${id}]`);
    const $tabPanelPrev = document.querySelector(`.tabPanel:not([hidden])`);

    $tabActive.removeAttribute('aria-selected');
    $tabSelected.setAttribute('aria-selected', true);
    $tabPanel.hidden = false;
    $tabPanelPrev.hidden = true;
};

$tabList.forEach((tab, index) => {
    tab.addEventListener('click', handleSelectTabClick);
    if (index === 0) {
        tab.textContent = 'Hoy';
        weekday = nextDay(weekday);
        return false;
    }
    tab.textContent = week[weekday];
    weekday = nextDay(weekday);
});
