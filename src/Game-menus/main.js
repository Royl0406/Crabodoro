import { storeTotSessions } from '../Common/storage-utilities.js';
import { navToPomodoro, navToCrabSpace } from '../Common/utilities.js'

window.onload = () => {
  var myButton = document.getElementById('btn-start');
  var crabSpaceBtn = document.getElementById("crab-space");
  var sessionInput = document.getElementById("session-input");

  myButton.onclick = async () => {
   
    let numSessions = (sessionInput.value < 1 || sessionInput.value > 20) ? 4: sessionInput.value;
    await storeTotSessions(numSessions);

    await chrome.runtime.sendMessage("start game");
    await navToPomodoro();
  };

  crabSpaceBtn.onclick = () => {
    navToCrabSpace();
  }
}

