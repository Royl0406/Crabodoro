import { addToTotGameCoins, decrementRemainingSessions } from "../Common/storage-utilities.js";
import { navToBreak, navToStats, displayRemainingTime, calcRemainingTime } from "../Common/utilities.js";


const MAX_COIN = 200;
let coinsEarnedThisSession = 0;

startUpdateLoop();

function startUpdateLoop() {
  const divRemainingTime = document.getElementById('remaining-time');

    setInterval(() => {
        chrome.storage.local.get(['startTime', 'TOTAL_TIME_MS', 'remainingTime', 'sessionDistractedTime'], async function (result) {
            let remainingTimeMs = calcRemainingTime(result.startTime, result.TOTAL_TIME_MS);
            if(remainingTimeMs < 0) {
                await finishPomodoro();
            }
            displayRemainingTime(divRemainingTime, remainingTimeMs);
            displayCoinCount(calcCoinEarned(result.TOTAL_TIME_MS, remainingTimeMs, result.sessionDistractedTime));
            coinsEarnedThisSession = calcCoinEarned(result.TOTAL_TIME_MS, remainingTimeMs, result.sessionDistractedTime);
        });
    }, 100);
}

async function finishPomodoro() {
  
  let remainingSessions = await decrementRemainingSessions();

  let result = chrome.storage.local.get(['sessionDistractedTime', 'totDistractedTime']);
  if(result.sessionDistractedTime === 0) {
    coinsEarnedThisSession = MAX_COIN;
  }

  let totDistractedTime = result.totDistractedTime + result.sessionDistractedTime;
  await chrome.storage.local.set({totDistractedTime});

  await addToTotGameCoins(coinsEarnedThisSession);

  if(remainingSessions > 0) {
    navToBreak();
  }
  else {
    navToStats();
  }
}



function displayCoinCount(coinCount) {
  const divCoinCount = document.getElementById('coin-count');
  divCoinCount.textContent = 'Coin: ' + Math.round(coinCount);
}

function calcCoinEarned(TOTAL_TIME_MS, remainingTimeMs, sessionDistractedTime) {
  const coinRate = MAX_COIN / TOTAL_TIME_MS;
  const coinDeductRate = coinRate / 2;

  const elapsedTime = TOTAL_TIME_MS - remainingTimeMs;
  const focusedTime = elapsedTime - sessionDistractedTime;

  const coinsEarned = coinRate * focusedTime;
  const coinsDeducted = sessionDistractedTime * coinDeductRate;
  return Math.round(coinsEarned - coinsDeducted);
}
