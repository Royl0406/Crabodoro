import { calcRemainingTime, displayRemainingTime, MINUTE_TO_MS, navToPomodoro } from "../Common/utilities.js";
import { fetchRemainingSessions } from "../Common/storage-utilities.js";

window.onload = async () => {
    const remainingSessDisplay = document.getElementById("remaining-sessions");
    const remainingTimeDisplay = document.getElementById("remaining-break-time");
    const btnEndBreak = document.getElementById("btn-skip");

    let startTime = (await chrome.storage.local.get(['breakStartTime'])).breakStartTime;
    let totalBreakMin = 1;
    let totalBreakTimeMs = totalBreakMin * MINUTE_TO_MS;
    let intervalId = setInterval(() => {
        let remainingTimeMs = calcRemainingTime(startTime, totalBreakTimeMs);
        if(remainingTimeMs <= 0) {
            remainingTimeDisplay.innerHTML = "Time's up";
            btnEndBreak.innerHTML = "Next Session";
            clearInterval(intervalId);
        }
        else {
            displayRemainingTime(remainingTimeDisplay, remainingTimeMs);
        }
    }, 100);

    remainingSessDisplay.innerHTML = (await fetchRemainingSessions()).toString();
    btnEndBreak.addEventListener("click", async () => {
        await navToPomodoro();
    })
}


  