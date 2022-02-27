import { passwordConfig, isValidLength, setLength, setCharacterOption } from "../utils/PasswordGenerator.js";

function createElement(tagName, attributes, children = []) {
  const element = Object.assign(document.createElement(tagName), attributes);
  element.append(...children);
  return element;
}

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

export function createLengthSlider(containerSelector) {
  const container = document.querySelector(containerSelector);
  const commonConfigs = {
    min: passwordConfig.length.MIN,
    max: passwordConfig.length.MAX,
    value: passwordConfig.length.value
  };
  const slider = createElement("input", { type: "range", ...commonConfigs });
  const counter = createElement("input", { type: "number", ...commonConfigs });

  slider.addEventListener("change", handleLengthChange(counter));
  counter.addEventListener("keydown", handleCounterKeyDown(slider));
  container.append(slider, counter);
}

export function createCheckboxes(containerSelector) {
  const container = document.querySelector(containerSelector);

  for (const key in passwordConfig.characters) {
    const input = createElement("input", {
      type: "checkbox",
      id: key,
      checked: passwordConfig.characters[key].checked
    });
    const element = createElement("div", {
      className: "pwd-checkbox"
    }, [
      input,
      createElement("label", {
        htmlFor: key,
        innerText: key[0].toUpperCase() + key.slice(1)
      })
    ]);
    element.addEventListener("change", () => {
      setCharacterOption(key, input.checked);
    });
    container.append(element);
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