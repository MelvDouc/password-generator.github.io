import $ from "./dollar-sign.js";
const copySuccessAlertBox = (() => {
    const element = $("#copy-success-alert");
    const animationClassName = "on";
    element.addEventListener("animationend", () => {
        element.classList.remove(animationClassName);
    });
    return {
        show: () => {
            element.classList.add(animationClassName);
        }
    };
})();
export default copySuccessAlertBox;
