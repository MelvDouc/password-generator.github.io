import config from "./config.js";
import { copySuccessAlertBox } from "./elements.js";
import { getRandomCharacter, shuffle } from "./utils.js";
class PasswordGenerator {
    _config = config;
    outputElement;
    _currentPassword;
    constructor(outputElement) {
        this.outputElement = outputElement;
    }
    get passwordConfig() {
        return this._config;
    }
    get currentPassword() {
        return this._currentPassword;
    }
    isValidLength = (value) => {
        return !isNaN(value)
            && value <= this._config.length.MAX
            && value >= this._config.length.MIN;
    };
    setLength = (value) => {
        this._config.length.value = value;
        this.output();
    };
    setCharacterOption = (key, value) => {
        this._config.characters[key].checked = value;
        this.output();
    };
    generate = () => {
        const checkedOptions = Object
            .values(this._config.characters)
            .filter(option => option.checked);
        if (!checkedOptions.length)
            return;
        let password = "";
        main: while (true) {
            for (const option of checkedOptions) {
                if (password.length >= this._config.length.value)
                    break main;
                password += getRandomCharacter(option.charCodes);
            }
        }
        this._currentPassword = shuffle(password);
    };
    output = () => {
        this.generate();
        this.outputElement.innerText = this._currentPassword;
    };
    copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(this._currentPassword);
            copySuccessAlertBox.show();
        }
        catch (error) {
            console.log(`Couldn't copy password to clipboard: ${error}`);
            return;
        }
    };
}
export const { passwordConfig, isValidLength, setLength, setCharacterOption, output, copyToClipboard } = new PasswordGenerator(document.querySelector("output"));
