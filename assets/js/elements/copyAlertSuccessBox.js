const copySuccessAlertBox = (() => {
  const element = document.getElementById("copy-success-alert");
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