import { fetchFocusTime, fetchLevel } from "../Common/storage-utilities.js";
import { MINUTE_TO_MS, SESSION_TIME_MINUTES } from "../Common/utilities.js";

const MULTIPLIER = 10;
export async function calcExpEarned() {
  const level = await fetchLevel();
  const percentTimeFocused = await calcPercentTimeFocused();
  const xpEarned = level * MULTIPLIER * percentTimeFocused;
  await storeExpEarned(xpEarned);
  return xpEarned;
}

export async function calcPercentTimeFocused() {
  const focusedTime = await fetchFocusTime();
  const totalTime = SESSION_TIME_MINUTES * MINUTE_TO_MS;
  const percentTimeFocused = focusedTime / totalTime;
  return percentTimeFocused;
}

interface Crab {
  name: string;
  level: number;
  xp: number;
}

async function storeExpEarned(xp: number) {
  const result = await chrome.storage.local.get(["crab"]);
  const crab = result.crab as Crab;
  crab.xp = crab.xp + xp;
  chrome.storage.local.set({ crab });
}
