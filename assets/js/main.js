import { getButton, createCheckboxes, createLengthSlider } from "./elements/index.js";
import { copyToClipboard, output } from "./utils/PasswordGenerator.js";

const newPasswordButton = getButton("#new-password-btn"),
  copyPasswordButton = getButton("#copy-password-btn");

createLengthSlider("#length-slider-container");
createCheckboxes("#checkboxes-container");
newPasswordButton.handleClick(output);
copyPasswordButton.handleClick(copyToClipboard);
output();