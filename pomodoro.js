//remainingTime / MILLISECONDS_PER_SECOND / SECONDS_PER_MINUTE
setInterval(() => {
    chrome.storage.local.get(['coinCount', 'remainingTime'], function (result) {
        displayCoinCount(result.coinCount);
        //To-do: format time with ln 1
        displayRemainingTime(result.remainingTime);
    });
}, 100);


function displayCoinCount(coinCount) {
    let divCoinCount = document.getElementById("coin-count");
    divCoinCount.textContent = coinCount;
}

function displayRemainingTime(remainingTime) {
    let divRemainingTime = document.getElementById("remaining-time");
    divRemainingTime.textContent = remainingTime;
}
