import config from "./config.js";
import copySuccessAlertBox from "../elements/copyAlertSuccessBox.js";
import { getRandomCharacter, shuffle } from "./functions.js";

class PasswordGenerator {
  #config;
  #outputElement;
  #currentPassword;

  constructor(config, outputElement) {
    this.#config = config;
    this.#outputElement = outputElement;
  }

  get passwordConfig() {
    return this.#config;
  }

  get currentPassword() {
    return this.#currentPassword;
  }

  isValidLength = (value) => {
    return !isNaN(value)
      && value <= this.#config.length.MAX
      && value >= this.#config.length.MIN;
  };

  setLength = (value) => {
    this.#config.length.value = value;
    this.output();
  };

  setCharacterOption = (key, value) => {
    this.#config.characters[key].checked = value;
    this.output();
  };

  #generate = () => {
    const checkedOptions = Object
      .values(this.#config.characters)
      .filter(option => option.checked);

    if (!checkedOptions.length)
      return;

    let password = "";

    main: while (true) {
      for (const option of checkedOptions) {
        if (password.length >= this.#config.length.value)
          break main;
        password += getRandomCharacter(option.charCodes);
      }
    }

    this.#currentPassword = shuffle(password);
  };

  output = () => {
    this.#generate();
    this.#outputElement.innerText = this.#currentPassword;
  };

  copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(this.#currentPassword);
      copySuccessAlertBox.show();
    }
    catch (error) {
      console.log(`Couldn't copy password to clipboard: ${error}`);
      return;
    }
  };
}

export const {
  passwordConfig,
  isValidLength,
  setLength,
  setCharacterOption,
  output,
  copyToClipboard
} = new PasswordGenerator(config, document.querySelector("output"));