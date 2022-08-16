import { calcMinutes, calcSeconds } from "../Common/utilities.js";
import { MAX_COIN, SESSION_TIME_MINUTES, MINUTE_TO_MS } from "../Common/utilities.js";

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

async function fetchFocusTime() {
    let result = await chrome.storage.local.get(['TOTAL_TIME_MS', 'totalDistractedTime']);
    let focusedTime = result.TOTAL_TIME_MS - result.totalDistractedTime;
    return focusedTime;
}

function displayTime(focusedTime) {
    let focusedMinute = Math.floor(calcMinutes(focusedTime));
    let focusedSecond = Math.round(calcSeconds(focusedTime));
    return focusedMinute + " Minutes " + focusedSecond + " Seconds";
}

await function calcPercentTimeFocused() {
    //fetch the total session time
    //make sure focusedTime and total-session-time is the same unit
    //calculate the percentage of time focused
    //return the percentage
    let focusedTime = await fetchFocusTime();
    let totalTime = SESSION_TIME_MINUTES * MINUTE_TO_MS;

    let percentTimeFocused = (focusedTime / totalTime).toFixed(2);
    
}

function displayXpEarned() {
    //Equation for calculating xp gain:
    // 40(1+0.5)^current level

    //calcXpEarned method in xp-utilities
        //must fetch current level
        //multiply by percentage of time focused
        //100% = *1
        //50% = *0.5

    //write a method to store that 
}