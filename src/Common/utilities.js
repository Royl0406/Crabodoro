export function calcMinutes(remainingTime) {
  return (remainingTime / 1000) / 60;
}

export function calcSeconds(remainingTime) {
  if ((remainingTime / 1000) % 60 >= 59) {
    return 59;
  }
  return (remainingTime / 1000) % 60;
}

export function calcSessionRemainingTime(startTime, sessionTimeMs) {
  const elapsedTime = (new Date()).getTime() - startTime;
  return sessionTimeMs - elapsedTime;
}

export function displayTime(htmlElement, timeMs) {
  htmlElement.textContent = Math.floor(calcMinutes(timeMs)) + ' : ' + Math.round(calcSeconds(timeMs));
}

export const SESSION_TIME_MINUTES = 0.2;
export const MAX_COIN = 200;
export const MINUTE_TO_MS = 60000;

//Changing locations
export function changePopupLocation (location) {
  window.location.href = location;
  chrome.action.setPopup(
    {popup: location},
  );
}

export function navToMainMenu() {
  const location = "main.html";
  changePopupLocation(location);
}

export function navToShop() {
  const location = "shop.html";
  changePopupLocation(location);
}

export function navToCrabSpace() {
  const location = "crabSpace.html";
  changePopupLocation(location);
}

export async function navToPomodoro() {
  const location = "pomodoro.html";
  changePopupLocation(location);
}

export function navToStats() {
  const location = "stats.html";
  changePopupLocation(location);
}

export async function navToBreak() {
  const location = "break.html";
  let breakStartTime = (new Date()).getTime();
  await chrome.storage.local.set({ breakStartTime });
  changePopupLocation(location);
}

export function navToSettings() {
  const location = "settings.html";
  changePopupLocation(location)
}