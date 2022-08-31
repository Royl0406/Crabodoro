import { changePopupLocation } from "../Common/utilities.js";

window.addEventListener("load", () => {
  var myButton = document.querySelector("#card-unrated");

  myButton.addEventListener("click", () => {
    var location = "/dist/Popup/pomodoro.html";
    changePopupLocation(location);
    chrome.runtime.sendMessage("start button clicked");
  });
});
