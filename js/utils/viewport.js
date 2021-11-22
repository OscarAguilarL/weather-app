export const setViewportSize = ($el) => {
    const viewportBlockSize = getViewport();
    $el.style.blockSize = `${viewportBlockSize}px`;
};

export const getViewport = () => {
    return window.innerHeight;
};

export const onViewportResize = (callback) => {
    window.addEventListener('resize', callback);
};

export const offViewportResize = (callback) => {
    window.removeEventListener('resize', callback);
};

export const viewPortSize = ($el) => {
    setViewportSize($el);

    onViewportResize(() => setViewportSize($el));
};
