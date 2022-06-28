//Tab Detector
//background.js
function isUrlDistracting(url) {
   if (url === "https://www.youtube.com/" || url === "https://www.instagram.com/") {
      return true;
   }
   return false;
}

function showScreenBlocker(tabId) {
   //executes script to change background
   chrome.scripting.executeScript({
      target: { tabId: tabId, allFrames: true },
      files: ['warning-tab.js']
   });
}

function urlChangeHandler(url, tabId) {
   let isDistracted = false;
   if (isUrlDistracting(url)) {
      showScreenBlocker(tabId);
      isDistracted = true;
   }
   chrome.storage.local.set({ isDistracted });
}



let isOnTask = async () => {
   let result = await chrome.storage.local.get(['isDistracted']);

   return !result.isDistracted;
}


let calculateCoinEarned = (elapsed, rate) => {
   return elapsed * rate;
}

function addTabListeners() {
   chrome.tabs.onActivated.addListener(function (activeInfo) {
      chrome.tabs.get(activeInfo.tabId, function (tab) {
         let currentUrl = tab.url;
         let currentTabId = tab.id;
         urlChangeHandler(currentUrl, currentTabId);
      });
   });

   chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
      if (tab.active && change.url) {
         let newUrl = change.url;
         urlChangeHandler(newUrl, tabId);
      }
   });
}

let startGame = () => {
   addTabListeners();

   const MILLISECONDS_PER_SECOND = 1000;
   const SECONDS_PER_MINUTE = 60;
   const SESSION_TIME_MINUTES = 40;
   const MAX_COIN = 200;
   const TOTAL_TIME_MS = SESSION_TIME_MINUTES * SECONDS_PER_MINUTE * MILLISECONDS_PER_SECOND;
   const COIN_RATE = MAX_COIN / TOTAL_TIME_MS;

   // Current time in milliseconds (from the epoch)
   let startTime = (new Date()).getTime();
   let coinCount = 0;

   let prevTime = (new Date()).getTime();
   setInterval(async () => {
      let nowTime = (new Date()).getTime();
      //if current time - start time = 1 second then update
      let elapsed = nowTime - startTime;

      let remainingTime = TOTAL_TIME_MS - elapsed;


      if (await isOnTask()) {
         coinCount += calculateCoinEarned(nowTime - prevTime, COIN_RATE);
      }


      //update text in html file
      chrome.storage.local.set({ coinCount });
      chrome.storage.local.set({ remainingTime });

      prevTime = nowTime;
   }, 1);
}

chrome.runtime.onMessage.addListener(
   function (request, sender, sendResponse) {
      if (request === "start button clicked") {
         startGame();
      }
      //Message handler must call a response callback
      sendResponse();
   }
);





