//import not working
//import { changePopupLocation } from '../Common/utilities'
//delete after import fixed
function changePopupLocation (location) {
  window.location.href = location;
  chrome.action.setPopup(
    {popup: location},
  );
}

window.onload = () => {
  var myButton = document.getElementById('card-unrated');

  myButton.onclick = () => {
    var location = "../Popup/pomodoro.html"
    changePopupLocation(location);
    chrome.runtime.sendMessage("start button clicked");
  };
}

