import { addToTotGameCoins, decrementRemainingSessions } from "../Common/storage-utilities.js";
import { navToBreak, navToStats, displayTime, calcSessionRemainingTime } from "../Common/utilities.js";


const MAX_COIN = 200;
let coinsEarnedThisSession = 0;

startUpdateLoop();

function startUpdateLoop() {
  const divRemainingTime = document.getElementById('remaining-time');

    setInterval(() => {
        chrome.storage.local.get(['startTime', 'sessionTimeMs', 'remainingTime', 'sessionDistractedTime'], async function (result) {
            let remainingTimeMs = calcSessionRemainingTime(result.startTime, result.sessionTimeMs);
            if(remainingTimeMs < 0) {
                await finishPomodoro();
            }
            displayTime(divRemainingTime, remainingTimeMs);
            displayCoinCount(calcSessionCoinEarned(result.sessionTimeMs, remainingTimeMs, result.sessionDistractedTime));
            coinsEarnedThisSession = calcSessionCoinEarned(result.sessionTimeMs, remainingTimeMs, result.sessionDistractedTime);
        });
    }, 100);
}

async function finishPomodoro() {
  
  let remainingSessions = await decrementRemainingSessions();

  let result = chrome.storage.local.get(['sessionDistractedTime', 'totalDistractedTime']);
  if(result.sessionDistractedTime === 0) {
    coinsEarnedThisSession = MAX_COIN;
  }

  let totalDistractedTime = result.totalDistractedTime + result.sessionDistractedTime;
  await chrome.storage.local.set({totalDistractedTime});

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

function calcSessionCoinEarned(sessionTimeMs, remainingTimeMs, sessionDistractedTime) {
  const coinRate = MAX_COIN / sessionTimeMs;
  const coinDeductRate = coinRate / 2;

  const elapsedTime = sessionTimeMs - remainingTimeMs;
  const focusedTime = elapsedTime - sessionDistractedTime;

  const coinsEarned = coinRate * focusedTime;
  const coinsDeducted = sessionDistractedTime * coinDeductRate;
  return Math.round(coinsEarned - coinsDeducted);
}
