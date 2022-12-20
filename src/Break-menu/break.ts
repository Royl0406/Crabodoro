import { calcRemainingTime, displayRemainingTime, MINUTE_TO_MS } from "../Common/utilities.js";
import { fetchRemainingSessions } from "../Common/storage-utilities.js";

window.onload = async () => {
    const remainingSessDisplay = document.getElementById("remaining-sessions");
    const remainingTimeDisplay = document.getElementById("remaining-break-time");
    let startTime = (new Date()).getTime();
    let totalBreakMin = 5;
    let totalBreakTimeMs = totalBreakMin * MINUTE_TO_MS;
    setInterval(() => {
        let remainingTimeMs = calcRemainingTime(startTime, totalBreakTimeMs);
        displayRemainingTime(remainingTimeDisplay, remainingTimeMs);
    }, 100);


    remainingSessDisplay.innerHTML = (await fetchRemainingSessions()).toString();
}


  