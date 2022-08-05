export function changePopupLocation (location) {
  window.location.href = location;
  chrome.action.setPopup(
    {popup: location},
  );
}

export async function isUrlBlocked(url, blockedList) {
  for(let i = 0; i < blockedList.length; i++) {
     if(url === blockedList[i]) {
        console.log("website found in block list");
        return true;
     }
  }
  return false;
}