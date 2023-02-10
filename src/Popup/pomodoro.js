import { addToTotGameCoins, decrementRemainingSessions, incrementSessionsElapsed } from "../Common/storage-utilities";
import { navToBreak, navToStats, displayTime, calcSessionRemainingTime } from "../Common/utilities";


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
            displayCoinCount(calcRunningSessionCoinEarned(result.sessionTimeMs, remainingTimeMs, result.sessionDistractedTime));
            coinsEarnedThisSession = calcRunningSessionCoinEarned(result.sessionTimeMs, remainingTimeMs, result.sessionDistractedTime);
        });
    }, 100);
}

async function finishPomodoro() {
  
  let remainingSessions = await decrementRemainingSessions();

  let result = await chrome.storage.local.get(['sessionDistractedTime', 'totalDistractedTime']);
  if(result.sessionDistractedTime === 0) {
    coinsEarnedThisSession = MAX_COIN;
  }

  let totalDistractedTime = result.totalDistractedTime + result.sessionDistractedTime;
  await chrome.storage.local.set({totalDistractedTime});

  await addToTotGameCoins(coinsEarnedThisSession);
  await incrementSessionsElapsed();

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

function calcRunningSessionCoinEarned(sessionTimeMs, remainingTimeMs, sessionDistractedTime) {
  const coinRate = MAX_COIN / sessionTimeMs;
  const coinDeductRate = coinRate / 2;

  const elapsedTime = sessionTimeMs - remainingTimeMs;
  const focusedTime = elapsedTime - sessionDistractedTime;

  const coinsEarned = coinRate * focusedTime;
  const coinsDeducted = sessionDistractedTime * coinDeductRate;
  return Math.round(coinsEarned - coinsDeducted);
}
