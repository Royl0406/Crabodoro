//import not working
//import { changePopupLocation } from "../Common/utilities";
//delete after import fixed
function changePopupLocation (location) {
    window.location.href = location;
    chrome.action.setPopup(
      {popup: location},
    );
  }
const MAX_COIN = 200;

startUpdateLoop();

function startUpdateLoop() {
    setInterval(() => {
        chrome.storage.local.get(['startTime', 'TOTAL_TIME_MS', 'remainingTime', 'totalDistractedTime'], function (result) {
            let remainingTimeMs = calcRemainingTime(result.startTime, result.TOTAL_TIME_MS);
            if(remainingTimeMs <= 0) {
                changePopupLocation()
            }
            displayRemainingTime(remainingTimeMs);
            displayCoinCount(calcCoinEarned(result.TOTAL_TIME_MS, remainingTimeMs, result.totalDistractedTime));
        });
    }, 100);
}

function displayCoinCount(coinCount) {
    let divCoinCount = document.getElementById("coin-count");
    divCoinCount.textContent = "Coin: " + Math.round(coinCount);
}

function calcRemainingTime(startTime, TOTAL_TIME_MS) {
    let elapsedTime = (new Date()).getTime() - startTime;
    return TOTAL_TIME_MS - elapsedTime;
}

function displayRemainingTime(remainingTime) {
    let divRemainingTime = document.getElementById("remaining-time");
    divRemainingTime.textContent = Math.floor(displayMinutes(remainingTime)) + " : " + Math.round(displaySeconds(remainingTime));
}

function displayMinutes(remainingTime) {
    return (remainingTime / 1000) / 60;
}

function displaySeconds(remainingTime) {
    if ((remainingTime / 1000) % 60 >= 59) {
        return 59
    }
    return (remainingTime / 1000) % 60;
}

function calcCoinEarned(TOTAL_TIME_MS, remainingTimeMs, totalDistractedTime) {
    let coinRate = MAX_COIN / TOTAL_TIME_MS;
    let coinDeductRate = coinRate / 2;

    let elapsedTime = TOTAL_TIME_MS - remainingTimeMs;
    let focusedTime = elapsedTime - totalDistractedTime;

    let coinsEarned = coinRate * focusedTime;
    let coinsDeducted = totalDistractedTime * coinDeductRate;
    return coinsEarned - coinsDeducted;
}
