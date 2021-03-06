import { passwordConfig, isValidLength, setLength, setCharacterOption, output, copyToClipboard } from "../utils/PasswordGenerator.js";
import $ from "./dollar-sign.js";
const handleLengthChange = (counter) => {
    return ({ target }) => {
        const value = +target.value;
        if (!isValidLength(value))
            return;
        counter.value = String(value);
        setLength(value);
    };
};
const handleCounterKeyDown = (slider) => {
    return (e) => {
        const value = e.target.valueAsNumber;
        const isArrowDown = e.key === "ArrowDown", isArrowUp = e.key === "ArrowUp";
        if (!isArrowDown && !isArrowUp
            || isArrowDown && value <= passwordConfig.length.MIN
            || isArrowUp && value >= passwordConfig.length.MAX
            || !isValidLength(value))
            return e.preventDefault();
        const newValue = isArrowDown ? value - 1 : value + 1;
        slider.value = String(newValue);
        setLength(newValue);
    };
};
export const setSliderAttributes = () => {
    const container = $("#length-slider-container");
    const commonConfigs = {
        min: passwordConfig.length.MIN,
        max: passwordConfig.length.MAX,
        value: passwordConfig.length.value
    };
    const slider = $("input[type='range']", container);
    const counter = $("input[type='number']", container);
    Object.assign(slider, {
        ...commonConfigs,
        onchange: handleLengthChange(counter)
    });
    Object.assign(counter, {
        ...commonConfigs,
        onkeydown: handleCounterKeyDown(slider)
    });
};
export const createCheckboxes = () => {
    const container = $("#checkboxes-container");
    for (const key in passwordConfig.characters) {
        const { checked } = passwordConfig.characters[key];
        container.innerHTML += `
      <div class="pwd-checkbox">
        <input type="checkbox" id="${key}" ${checked ? "checked" : ""} />
        <label for="${key}">${key[0].toUpperCase() + key.slice(1)}</label>
      </div>
    `;
    }
    container.addEventListener("change", ({ target }) => {
        if (!(target instanceof HTMLInputElement))
            return;
        setCharacterOption(target.id, target.checked);
    });
};
export const handleButtonsClick = () => {
    $("#new-password-btn").addEventListener("click", output);
    $("#copy-password-btn").addEventListener("click", copyToClipboard);
};
