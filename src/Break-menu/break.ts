import { calcRemainingTime, displayRemainingTime, MINUTE_TO_MS, navToPomodoro } from "../Common/utilities.js";
import { calcRemainingBreakTime, fetchRemainingSessions } from "../Common/storage-utilities.js";

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
            displayRemainingTime(remainingTimeDisplay, remainingTimeMs);
        }
    }, 100);

    remainingSessDisplay.innerHTML = (await fetchRemainingSessions()).toString();
    btnEndBreak.addEventListener("click", async () => {
        await chrome.storage.local.set({breakStartTime: null});
        await chrome.runtime.sendMessage("start session");
        await navToPomodoro();
    })
}


  