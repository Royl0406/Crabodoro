document.addEventListener("DOMContentLoaded", async function() {
    const COIN_EARNED = document.getElementById("total-coin");
    const FOCUS_TIME = document.getElementById("focus-time");
    const XP_Earned = document.getElementById("total-xp");

    FOCUS_TIME.innerHTML += await fetchFocusTime();
    COIN_EARNED.innerHTML += await fetchEarnedCoin();
})

async function fetchEarnedCoin () {
    let result = await chrome.storage.local.get(["totCoinsEarned"]);
    return result.totCoinsEarned;
}

async function fetchFocusTime () {
    let result = await chrome.storage.local.get(['TOTAL_TIME_MS', 'totalDistractedTime']);
    return result.TOTAL_TIME_MS - result.totalDistractedTime;
    
}