import { calcMinutes, calcSeconds, navToMainMenu, MAX_COIN } from "../Common/utilities.js";
import { calcExpEarned } from "./xp-utilities.js";
import { fetchFocusTime, addToTotCoins } from "../Common/storage-utilities.js";

document.addEventListener("DOMContentLoaded", async function () {
    const COIN_EARNED = document.getElementById("total-coin");
    const FOCUS_TIME = document.getElementById("focus-time");
    const XP_Earned = document.getElementById("total-xp");
    const BTN_RETURN = document.getElementById("nav-main");

    FOCUS_TIME.innerHTML += displayTime(await fetchFocusTime());
    COIN_EARNED.innerHTML += await fetchEarnedCoinInSession();
    XP_Earned.innerHTML += await calcExpEarned();

    BTN_RETURN.addEventListener("click", () => {
        navToMainMenu();
    })
})


async function fetchEarnedCoinInSession() {
    let result = await chrome.storage.local.get(["totCoinsEarned", "totalDistractedTime"]);
    let distractedTime = result.totalDistractedTime;
    let totCoinsEarned = distractedTime === 0 ? MAX_COIN : result.totCoinsEarned
    
    addToTotCoins(totCoinsEarned);
    console.log("fetchearnedcoin done");
    return Math.round(totCoinsEarned);
}

function displayTime(focusedTime) {
    let focusedMinute = Math.floor(calcMinutes(focusedTime));
    let focusedSecond = Math.round(calcSeconds(focusedTime));
    return focusedMinute + " Minutes " + focusedSecond + " Seconds";
}


