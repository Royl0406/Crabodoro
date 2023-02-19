import * as Sentry from "@sentry/browser";

import { calcMinutes, calcSeconds, navToMainMenu } from "../Common/utilities";
import { calcTotalExpEarned } from "./xp-utilities";
import { fetchTotalFocusTime, fetchGameCoins } from "../Common/storage-utilities";

Sentry.init({
    dsn: "https://7b5103208c5a4e8bb24932177645d34e@o1294946.ingest.sentry.io/4504602726957056",
  
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });  

document.addEventListener("DOMContentLoaded", async function () {
    const COIN_EARNED = document.getElementById("total-coin") as HTMLElement;
    const FOCUS_TIME = document.getElementById("focus-time") as HTMLElement;
    const XP_Earned = document.getElementById("total-xp") as HTMLElement;
    const BTN_RETURN = document.getElementById("nav-main") as HTMLElement;

    FOCUS_TIME.innerHTML += displayTime(await fetchTotalFocusTime());
    COIN_EARNED.innerHTML += await fetchGameCoins();
    XP_Earned.innerHTML += await calcTotalExpEarned();

    BTN_RETURN.addEventListener("click", () => {
        navToMainMenu();
    })

    await chrome.runtime.sendMessage("end game");
})




function displayTime(focusedTime) {
    let focusedMinute = Math.floor(calcMinutes(focusedTime));
    let focusedSecond = Math.round(calcSeconds(focusedTime));
    return focusedMinute + " Minutes " + focusedSecond + " Seconds";
}


