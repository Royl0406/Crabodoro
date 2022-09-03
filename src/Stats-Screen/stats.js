import { calcMinutes, calcSeconds } from "../Common/utilities.js";
import { MAX_COIN } from "../Common/utilities.js";
import { calcExpEarned } from "./xp-utilities.js";
import { fetchFocusTime } from "../Common/storage-utilities.js";
import { changePopupLocation } from '../Common/utilities.js'

document.addEventListener("DOMContentLoaded", async function () {
    const COIN_EARNED = document.getElementById("total-coin");
    const FOCUS_TIME = document.getElementById("focus-time");
    const XP_Earned = document.getElementById("total-xp");
    const BTN_RETURN = document.getElementById("nav-main");

    FOCUS_TIME.innerHTML += displayTime(await fetchFocusTime());
    COIN_EARNED.innerHTML += await fetchEarnedCoin();
    XP_Earned.innerHTML += await calcExpEarned();

    BTN_RETURN.addEventListener("click", () => {
        var location = "/dist/Game-menus/main.html";
        changePopupLocation(location);
    })
})


async function fetchEarnedCoin() {
    let result = await chrome.storage.local.get(["totCoinsEarned", "totalDistractedTime"]);
    let distractedTime = result.totalDistractedTime;
    if (distractedTime === 0) {
        return MAX_COIN;
    }
    return result.totCoinsEarned;
}

function displayTime(focusedTime) {
    let focusedMinute = Math.floor(calcMinutes(focusedTime));
    let focusedSecond = Math.round(calcSeconds(focusedTime));
    return focusedMinute + " Minutes " + focusedSecond + " Seconds";
}