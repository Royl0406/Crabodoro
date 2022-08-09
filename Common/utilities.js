export function changePopupLocation (location) {
  window.location.href = location;
  chrome.action.setPopup(
    {popup: location},
  );
}

export function calcMinutes(remainingTime) {
  return (remainingTime / 1000) / 60;
}

export function calcSeconds(remainingTime) {
  if ((remainingTime / 1000) % 60 >= 59) {
    return 59;
  }
  return (remainingTime / 1000) % 60;
}

export const SESSION_TIME_MINUTES = 0.1;
export const MAX_COIN = 200;