export function calcMinutes(remainingTime) {
  return (remainingTime / 1000) / 60;
}

export function calcSeconds(remainingTime) {
  if ((remainingTime / 1000) % 60 >= 59) {
    return 59;
  }
  return (remainingTime / 1000) % 60;
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
  const location = "/dist/Game-menus/main.html";
  changePopupLocation(location);
}

export function navToShop() {
  const location = "/dist/Shop/shop.html";
  changePopupLocation(location);
}

export function navToCrabSpace() {
  const location = "/dist/Crab-Space/crabSpace.html";
  changePopupLocation(location);
}

export function navToPomodoro() {
  const location = "/dist/Popup/pomodoro.html";
  changePopupLocation(location);
}

export function navToStats() {
  const location = "/dist/Stats-Screen/stats.html";
  changePopupLocation(location);
}

export function navToBreak() {
  const location = "/dist/Break-menu/break.html";
  changePopupLocation(location);
}