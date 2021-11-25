const DEFAULT_CONFIG = {
    open: true,
    debug: true,
    animatable: true,
};

export const draggable = ($element, config = DEFAULT_CONFIG) => {
    function logger(message) {
        if (config.debug) console.info(message);
    }

    if (!($element instanceof HTMLElement)) {
        return console.warn(
            `Elemento invalido, se esperaba un HTMLElement y se recibió: ${typeof $element}`
        );
    }
};
