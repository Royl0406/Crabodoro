document.addEventListener("DOMContentLoaded", function() {
    const COIN_EARNED = document.getElementById("coin-earned");
    const FOCUS_TIME = document.getElementById("focus-time");
    print(fetchEarnedCoin);
    print(fetchFocusTime);

    FOCUS_TIME.innerHTML += fetchFocusTime();
    COIN_EARNED.innerHTML += fetchEarnedCoin();
})

async function fetchEarnedCoin () {
    await chrome.local.storage.get(totCoinsEarned, function() {
        return totCoinsEarned;
    })
}

async function fetchFocusTime () {
    await chrome.local.storage.get(['TOTAL_TIME_MS', 'totalDistractedTime'], function (result) {
        return result.TOTAL_TIME_MS - result.totalDistractedTime;
    })
}