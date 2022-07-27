document.addEventListener("DOMContentLoaded", async function() {
    const COIN_EARNED = document.getElementById("coin-earned");
    const FOCUS_TIME = document.getElementById("focus-time");

    FOCUS_TIME.innerHTML += await fetchFocusTime();
    COIN_EARNED.innerHTML += await fetchEarnedCoin();
})

function fetchEarnedCoin () {
    let result = await chrome.local.storage.get(["totCoinsEarned"]);
    //return result.
}

async function fetchFocusTime () {
    await chrome.local.storage.get(['TOTAL_TIME_MS', 'totalDistractedTime'], function (result) {
        return result.TOTAL_TIME_MS - result.totalDistractedTime;
    })
}