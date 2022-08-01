document.addEventListener("DOMContentLoaded", async function() {
    const COIN_EARNED = document.getElementById("total-coin");
    const FOCUS_TIME = document.getElementById("focus-time");
    const XP_Earned = document.getElementById("total-xp");

    FOCUS_TIME.innerHTML += await fetchFocusTime();
    COIN_EARNED.innerHTML += await fetchEarnedCoin();
})

async function fetchEarnedCoin () {
    let result = await chrome.local.storage.get(["totCoinsEarned"]);
    return result.totCoinsEarned;
}

async function fetchFocusTime () {
    await chrome.local.storage.get(['TOTAL_TIME_MS', 'totalDistractedTime'], function (result) {
        return result.TOTAL_TIME_MS - result.totalDistractedTime;
    })
}