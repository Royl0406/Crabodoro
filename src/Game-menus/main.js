import * as Sentry from "@sentry/browser";

import { storeTotSessions } from "../Common/storage-utilities";
import { navToPomodoro, navToCrabSpace, navToSettings } from "../Common/utilities";

Sentry.init({
  dsn: "https://7b5103208c5a4e8bb24932177645d34e@o1294946.ingest.sentry.io/4504602726957056",

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

window.onload = () => {
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

