import { getButton, createCheckboxes, setSliderAttributes } from "./elements/index.js";
import { copyToClipboard, output } from "./utils/PasswordGenerator.js";

const newPasswordButton = getButton("#new-password-btn"),
  copyPasswordButton = getButton("#copy-password-btn");

setSliderAttributes();
createCheckboxes();
newPasswordButton.handleClick(output);
copyPasswordButton.handleClick(copyToClipboard);
output();