import { fetchLevel, fetchFocusTime } from "../Common/storage-utilities.js";
import { SESSION_TIME_MINUTES, MINUTE_TO_MS } from "../Common/utilities.js";

const MULTIPLIER = 10;
export async function calcExpEarned() {
    let level = await fetchLevel();
    let percentTimeFocused = await calcPercentTimeFocused();
    let xpEarned = level * MULTIPLIER * percentTimeFocused;
    await storeExpEarned(xpEarned);
    return xpEarned;
}

export async function calcPercentTimeFocused() {
    let focusedTime = await fetchFocusTime();
    let totalTime = SESSION_TIME_MINUTES * MINUTE_TO_MS;
    let percentTimeFocused = (focusedTime / totalTime);
    return percentTimeFocused;
}

interface Crab {
    name: string;
    level: number;
    xp: number;
}

async function storeExpEarned(xp: number) {
    let result = await chrome.storage.local.get(['crab']);
    let crab = result.crab as Crab;
    crab.xp = crab.xp + xp;
    chrome.storage.local.set({ crab });
}