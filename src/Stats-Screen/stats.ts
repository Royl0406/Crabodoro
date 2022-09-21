import { calcMinutes, calcSeconds, navToMainMenu } from "../Common/utilities.js";
import { MAX_COIN } from "../Common/utilities.js";
import { calcExpEarned, calcLevelUpXp } from "./xp-utilities.js";
import { fetchFocusTime, fetchLevel, fetchXp } from "../Common/storage-utilities.js";
import { Crab } from "../Types";

document.addEventListener("DOMContentLoaded", async function () {
    const COIN_EARNED = document.getElementById("total-coin");
    const FOCUS_TIME = document.getElementById("focus-time");
    const XP_Earned = document.getElementById("total-xp");
    const BTN_RETURN = document.getElementById("nav-main");

    FOCUS_TIME.innerHTML += displayTime(await fetchFocusTime());
    COIN_EARNED.innerHTML += await fetchEarnedCoin();
    XP_Earned.innerHTML += await calcExpEarned();

    BTN_RETURN.addEventListener("click", () => {
        navToMainMenu();
    })
})


async function fetchEarnedCoin() {
    let result = await chrome.storage.local.get(["totCoinsEarned", "totalDistractedTime"]);
    let distractedTime = result.totalDistractedTime;
    if (distractedTime === 0) {
        return MAX_COIN;
    }
    storeCoinEarned(result.totCoinsEarned);
    return Math.round(result.totCoinsEarned);
}

function displayTime(focusedTime) {
    let focusedMinute = Math.floor(calcMinutes(focusedTime));
    let focusedSecond = Math.round(calcSeconds(focusedTime));
    return focusedMinute + " Minutes " + focusedSecond + " Seconds";
}


async function storeCoinEarned(coin) {
    let result = await chrome.storage.local.get(['crab']);
    let crab = result.crab as Crab;
    crab.coin = crab.coin + coin;
    console.log("storeCoin: " + crab.coin);
    chrome.storage.local.set({ crab });
}