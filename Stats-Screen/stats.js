import { calcMinutes, calcSeconds } from "../Common/utilities.js";
import { MAX_COIN, SESSION_TIME_MINUTES, MINUTE_TO_MS } from "../Common/utilities.js";
import { calcExpEarned, calcPercentTimeFocused } from "."

document.addEventListener("DOMContentLoaded", async function () {
    const COIN_EARNED = document.getElementById("total-coin");
    const FOCUS_TIME = document.getElementById("focus-time");
    const XP_Earned = document.getElementById("total-xp");

    FOCUS_TIME.innerHTML += displayTime(await fetchFocusTime());
    COIN_EARNED.innerHTML += await fetchEarnedCoin();
})

async function fetchEarnedCoin() {
    let result = await chrome.storage.local.get(["totCoinsEarned", "totalDistractedTime"]);
    let distractedTime = result.totalDistractedTime;
    console.log(distractedTime);
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



function displayXpEarned() {
    //Equation for calculating xp gain:
    // 40(1+0.5)^current level

   

    //write a method to store that 
}