import { navToPomodoro, navToCrabSpace } from '../Common/utilities.js'

window.onload = () => {
  var myButton = document.getElementById('card-unrated');
  var crabSpaceBtn = document.getElementById("crab-space");

  myButton.onclick = () => {
    navToPomodoro();
    chrome.runtime.sendMessage("start button clicked");
  };

  crabSpaceBtn.onclick = () => {
    navToCrabSpace();
  }
}

