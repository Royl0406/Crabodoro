import { decrementRemainingSessions, fetchRemainingSessions } from "../Common/storage-utilities.js";
import { navToBreak, navToCrabSpace, navToStats } from "../Common/utilities.js";
import { calcMinutes } from "../Common/utilities.js";
import { calcSeconds } from "../Common/utilities.js";

const MAX_COIN = 200;
let totCoinsEarned = 0;

startUpdateLoop();

function startUpdateLoop() {
    setInterval(() => {
        chrome.storage.local.get(['startTime', 'TOTAL_TIME_MS', 'remainingTime', 'totalDistractedTime'], async function (result) {
            let remainingTimeMs = calcRemainingTime(result.startTime, result.TOTAL_TIME_MS);
            if(remainingTimeMs < 0) {
                await finishPomodoro();
            }
            displayRemainingTime(remainingTimeMs);
            displayCoinCount(calcCoinEarned(result.TOTAL_TIME_MS, remainingTimeMs, result.totalDistractedTime));
            totCoinsEarned = calcCoinEarned(result.TOTAL_TIME_MS, remainingTimeMs, result.totalDistractedTime);
        });
    }, 100);
}

async function finishPomodoro() {
  chrome.storage.local.set({ totCoinsEarned });
  
  let remainingSessions = await decrementRemainingSessions();

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

function calcRemainingTime(startTime, TOTAL_TIME_MS) {
  const elapsedTime = (new Date()).getTime() - startTime;
  return TOTAL_TIME_MS - elapsedTime;
}

function displayRemainingTime(remainingTime) {
  const divRemainingTime = document.getElementById('remaining-time');
  divRemainingTime.textContent = Math.floor(calcMinutes(remainingTime)) + ' : ' + Math.round(calcSeconds(remainingTime));
}

function calcCoinEarned(TOTAL_TIME_MS, remainingTimeMs, totalDistractedTime) {
  const coinRate = MAX_COIN / TOTAL_TIME_MS;
  const coinDeductRate = coinRate / 2;

  const elapsedTime = TOTAL_TIME_MS - remainingTimeMs;
  const focusedTime = elapsedTime - totalDistractedTime;

  const coinsEarned = coinRate * focusedTime;
  const coinsDeducted = totalDistractedTime * coinDeductRate;
  return Math.round(coinsEarned - coinsDeducted);
}
