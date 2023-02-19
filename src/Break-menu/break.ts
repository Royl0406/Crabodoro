import * as Sentry from "@sentry/browser";

import { displayTime, navToPomodoro } from "../Common/utilities";
import { calcRemainingBreakTime, fetchRemainingSessions } from "../Common/storage-utilities";

Sentry.init({
    dsn: "https://7b5103208c5a4e8bb24932177645d34e@o1294946.ingest.sentry.io/4504602726957056",
  
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });  

window.onload = async () => {
    const remainingSessDisplay = document.getElementById("remaining-sessions");
    const remainingTimeDisplay = document.getElementById("remaining-break-time");
    const btnEndBreak = document.getElementById("btn-skip");

   
    let intervalId = setInterval(async () => {
        let remainingTimeMs = await calcRemainingBreakTime();
        if(remainingTimeMs <= 0) {
            remainingTimeDisplay.innerHTML = "Time's up";
            btnEndBreak.innerHTML = "Next Session";
            clearInterval(intervalId);
        }
        else {
            displayTime(remainingTimeDisplay, remainingTimeMs);
        }
    }, 100);

    remainingSessDisplay.innerHTML = (await fetchRemainingSessions()).toString();
    btnEndBreak.addEventListener("click", async () => {
        await chrome.storage.local.set({breakStartTime: null});
        await chrome.runtime.sendMessage("start session");
        await navToPomodoro();
    })
}


  