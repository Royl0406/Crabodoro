import "../sentry";

import { storeTotSessions } from "../Common/storage-utilities";
import { navToPomodoro, navToCrabSpace, navToSettings } from "../Common/utilities";

window.onload = () => {
  throw new Error("beetle");

  var myButton = document.getElementById('btn-start');
  var crabSpaceBtn = document.getElementById("crab-space");
  var sessionInput = document.getElementById("session-input");
  var settingsBtn = document.getElementById("btn-settings");

  myButton.onclick = async () => {
   
    let numSessions = (sessionInput.value < 1 || sessionInput.value > 20) ? 4: sessionInput.value;
    await storeTotSessions(numSessions);

    await chrome.runtime.sendMessage("start game");
    await navToPomodoro();
  };

  crabSpaceBtn.onclick = () => {
    navToCrabSpace();
  }

  settingsBtn.onclick = () => {
    chrome.tabs.create({
      url: "settings.html"
   })
  }
}

