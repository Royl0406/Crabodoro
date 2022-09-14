import { fetchLevel, fetchFocusTime, fetchXp, updateLevel } from "../Common/storage-utilities";
import { SESSION_TIME_MINUTES, MINUTE_TO_MS } from "../Common/utilities";
import { Crab } from "../Types/crab";

const MULTIPLIER = 10;
export async function calcExpEarned() {
    let level = await fetchLevel();
    let percentTimeFocused = await calcPercentTimeFocused();
    let xpEarned = level * MULTIPLIER * percentTimeFocused as number;
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
    let levelUpXP = (prevLevel + level) * 80;
    return levelUpXP;
}

export async function storeNewLevelUpXp(xp: number) {
    let result = await chrome.storage.local.get(['crab']);
    let crab = result.crab as Crab;
    crab.nextLevelXp = xp;
    chrome.storage.local.set({ crab });
}

export function shouldLevelUp(xp: number, level: number) {
    return xp >= calcLevelUpXp(level);
}

export async function tryLevelUp() {
    let level = await fetchLevel();
    let xp = await fetchXp();
    if(shouldLevelUp(xp, level)) {
        updateLevel(level+1);
        storeNewLevelUpXp(calcLevelUpXp(level+1));
    }
}

