import { navToPomodoro, navToCrabSpace } from '../Common/utilities.js'

window.onload = () => {
  var myButton = document.getElementById('card-unrated');
  var crabSpaceBtn = document.getElementById("crab-space");

  myButton.onclick = async () => {
    await chrome.runtime.sendMessage("start button clicked");
    navToPomodoro();
  };

  crabSpaceBtn.onclick = () => {
    navToCrabSpace();
  }
}

