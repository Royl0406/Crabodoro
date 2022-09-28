import { fetchLevel, fetchFocusTime, fetchXp } from "../Common/storage-utilities.js";
import { SESSION_TIME_MINUTES, MINUTE_TO_MS } from "../Common/utilities.js";
import { Crab } from "../Types/crab";


export async function calcExpEarned() {
    let level = await fetchLevel();
    let percentTimeFocused = await calcPercentTimeFocused();
    const monkeyTypeXpModel = (49 * (level - 1) + 100);
    let xpEarned = monkeyTypeXpModel * percentTimeFocused as number;
    if(xpEarned < 0) {
        xpEarned = 0;
    }
    await storeExpEarned(xpEarned);
    return Math.round(xpEarned);
}

export async function calcPercentTimeFocused() {
    let focusedTime = await fetchFocusTime();
    let totalTime = SESSION_TIME_MINUTES * MINUTE_TO_MS;
    let percentTimeFocused = (focusedTime / totalTime);
    return percentTimeFocused;
}

async function storeExpEarned(xp: number) {
    let result = await chrome.storage.local.get(['crab']);
    let crab = result.crab as Crab;
    crab.xp = crab.xp + xp;
    chrome.storage.local.set({ crab });
}

//Not used
export function calcLevelUpXp(level: number) {
    let prevLevel = level - 1;
    //model taken from MonkeyType
    let levelUpXP = 49 * (level - 1) + 100;
    return levelUpXP;
}

export function calcLevel(totXp: number) {
    //model taken from MonkeyType
    return Math.floor(1 / 98 * (-151 + Math.sqrt(392 * totXp + 22801)) + 1);
}

export async function calcTotalXpForLevel(level: number) {
    let xpSum = 0;
    for(let i = level; i > 0; i--) {
        xpSum += await calcLevelUpXp(i);
    }
    return xpSum;
}
