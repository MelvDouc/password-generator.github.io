const $ = (selector, parent = document) => {
    const element = parent.querySelector(selector);
    if (!element)
        throw new Error(`No element with this selector was found: ${selector}`);
    return element;
};
export default $;
