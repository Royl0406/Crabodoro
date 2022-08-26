import { changePopupLocation } from '../Common/utilities.js'

window.onload = () => {
  var myButton = document.getElementById('card-unrated');

  myButton.onclick = () => {
    var location = "/src/Popup/pomodoro.html"
    changePopupLocation(location);
    chrome.runtime.sendMessage("start button clicked");
  };
}

