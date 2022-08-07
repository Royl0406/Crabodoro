export function changePopupLocation (location) {
  window.location.href = location;
  chrome.action.setPopup(
    {popup: location},
  );
}