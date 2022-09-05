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
  const LOCATION = "/dist/Game-menus/main.html";
  changePopupLocation(LOCATION);
}

export function navToShop() {
  const LOCATION = "/dist/Shop/shop.html";
  changePopupLocation(LOCATION);
}

export function navToCrabSpace() {
  const LOCATION = "/dist/Crab-Space/crabSpace.html";
  changePopupLocation(LOCATION);
}

export function navToPomodoro() {
  const LOCATION = "/dist/Popup/pomodoro.html";
  changePopupLocation(LOCATION);
}

export function navToStats() {
  const LOCATION = "/dist/Stats-Screen/stats.html";
  changePopupLocation(LOCATION);
}