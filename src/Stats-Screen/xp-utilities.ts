import { fetchLevel, fetchFocusTime, fetchXp } from "../Common/storage-utilities";
import { SESSION_TIME_MINUTES, MINUTE_TO_MS } from "../Common/utilities";
import { Crab } from "../Types/crab";

const MULTIPLIER = 100;
export async function calcExpEarned() {
    let level = await fetchLevel();
    let percentTimeFocused = await calcPercentTimeFocused();
    let xpEarned = MULTIPLIER * percentTimeFocused as number;
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

export function calcLevelUpXp(level: number) {
    let prevLevel = level - 1;
    //model taken from MonkeyType
    let levelUpXP = 49 * (level - 1) + 100;
    return levelUpXP;
}

export function getLevel(totXp: number) {
    //model taken from MonkeyType
    return 1 / 98 * (-151 + Math.sqrt(392 * totXp + 22801)) + 1;
}
