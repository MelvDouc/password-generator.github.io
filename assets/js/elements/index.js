import { passwordConfig, isValidLength, setLength, setCharacterOption } from "../utils/PasswordGenerator.js";

const handleLengthChange = (counter) => {
  return (e) => {
    const value = +e.target.value;
    if (!isValidLength(value))
      return;
    counter.value = String(value);
    setLength(value);
  };
};

const handleCounterKeyDown = (slider) => {
  return (e) => {
    const value = e.target.valueAsNumber;
    const isArrowDown = e.key === "ArrowDown",
      isArrowUp = e.key === "ArrowUp";

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

export function setSliderAttributes() {
  const container = document.getElementById("length-slider-container");
  const commonConfigs = {
    min: passwordConfig.length.MIN,
    max: passwordConfig.length.MAX,
    value: passwordConfig.length.value
  };
  const slider = container.querySelector("input[type='range']");
  const counter = container.querySelector("input[type='number']");

  for (const key in commonConfigs) {
    slider.setAttribute(key, commonConfigs[key]);
    counter.setAttribute(key, commonConfigs[key]);
  }

  slider.addEventListener("change", handleLengthChange(counter));
  counter.addEventListener("keydown", handleCounterKeyDown(slider));
}

export function createCheckboxes() {
  const container = document.getElementById("checkboxes-container");
  const template = document.getElementById("checkbox-template");

  for (const key in passwordConfig.characters) {
    const clone = template.content.cloneNode(true);
    const label = clone.querySelector("label");
    label.innerText = key[0].toUpperCase() + key.slice(1);
    label.htmlFor = key;
    const input = clone.querySelector("input");
    input.id = key;
    input.checked = passwordConfig.characters[key].checked;
    input.addEventListener("change", () => {
      setCharacterOption(key, input.checked);
    });
    container.append(clone);
  }
}

export const getButton = (selector) => {
  const button = document.querySelector(selector);
  return {
    handleClick: (listener) => {
      button.addEventListener("click", listener);
    }
  };
};