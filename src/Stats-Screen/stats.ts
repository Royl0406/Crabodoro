import "../sentry";

import { calcMinutes, calcSeconds, navToMainMenu } from "../Common/utilities";
import { calcTotalExpEarned } from "./xp-utilities";
import { fetchTotalFocusTime, fetchGameCoins } from "../Common/storage-utilities";

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


