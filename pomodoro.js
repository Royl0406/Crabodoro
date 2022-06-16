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
    divCoinCount.textContent = "Coin: " + Math.round(coinCount);
}

function displayRemainingTime(remainingTime) {
    let divRemainingTime = document.getElementById("remaining-time");
    divRemainingTime.textContent = Math.ceil(displayMinutes(remainingTime)) + " : " + Math.round(displaySeconds(remainingTime));
}

function displayMinutes(remainingTime) {
    return (remainingTime / 1000)  / 60;
}

function displaySeconds(remainingTime) {
    if((remainingTime / 1000) % 60 >= 59) {
        return 59
    }
    return (remainingTime / 1000) % 60;
}
