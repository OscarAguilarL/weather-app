const DEFAULT_CONFIG = {
    open: false,
    debug: true,
    animatable: true,
};

export const draggable = ($element, config = DEFAULT_CONFIG) => {
    if (!($element instanceof HTMLElement)) {
        return console.warn(
            `Elemento invalido, se esperaba un HTMLElement y se recibió: ${typeof $element}`
        );
    }

    let isOpen = config.open;
    let isDragging = false;
    const elementRect = $element.getBoundingClientRect();
    const ELEMENT_BLOCK_SIZE = elementRect.height;
    const $marker = $element.querySelector('[data-marker]');
    const MARKER_BLOCK_SIZE = $marker.getBoundingClientRect().height;

    const VISIBLE_Y_POSITION = 0;
    const HIDDEN_Y_POSITION = ELEMENT_BLOCK_SIZE - MARKER_BLOCK_SIZE;
    let widgetPosition = VISIBLE_Y_POSITION;

    $marker.addEventListener('click', handleClickClick);
    $marker.addEventListener('pointerdown', handlePointerDown);
    $marker.addEventListener('pointerup', handlePointerUp);
    $marker.addEventListener('pointerout', handlePointerOut);
    $marker.addEventListener('pointercancel', handlePointerCancel);
    $marker.addEventListener('pointermove', handlePointerMove);

    function handlePointerDown() {
        logger('Pointer DOWN');
    }
    function handlePointerOut() {
        logger('Pointer OUT');
    }
    function handlePointerCancel() {
        logger('Pointer CANCEL');
    }

    function handlePointerUp() {
        logger('Pointer UP');
    }

    function handlePointerMove() {
        logger('Pointer MOVE');
    }

    function handleClickClick(e) {
        logger('click');
        toggle();
    }

    function toggle() {
        if (!isDragging) {
            if (!isOpen) {
                return open();
            }
            return close();
        }
    }

    const logger = (message) => {
        if (config.debug) console.info(message);
    };

    const setWidgetPosition = (value) => {
        $element.style.marginBottom = `-${value}px`;
    };

    const open = () => {
        logger('Abrir widget');
        isOpen = true;
        widgetPosition = VISIBLE_Y_POSITION;
        setWidgetPosition(widgetPosition);
    };

    const close = () => {
        logger('Cerrar widget');
        isOpen = false;
        widgetPosition = HIDDEN_Y_POSITION;
        setWidgetPosition(widgetPosition);
    };
    isOpen ? open() : close();
};
