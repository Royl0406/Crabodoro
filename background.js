//Tab Detector
//background.js
import {isUrlBlocked} from "./Common/storage-utilities.js";


chrome.runtime.onInstalled.addListener(function (e) {
   if(e.reason === chrome.runtime.OnInstalledReason.INSTALL) {
      chrome.storage.local.set({isOnboardingDone: false})
      
      let blocked = [];
      chrome.storage.local.set({ blocked })

      chrome.tabs.create({
         url: "./Settings/onBoarding.html"
      })
   }
})

async function fetchBlockedList() {
   let blockedList = await chrome.storage.local.get(["blocked"]);
   return blockedList.blocked;
}

async function isUrlDistracting(url) {
   let blockedList = await fetchBlockedList();
   return isUrlBlocked(url, blockedList);
}

function showScreenBlocker(tabId) {
   //executes script to change background
   chrome.scripting.executeScript({
      target: { tabId: tabId, allFrames: true },
      files: ['Screen-Blocker/warning-tab.js']
   });
}

async function urlChangeHandler(url, tabId) {
   let isDistracted = false;
   let { isDistracted: prevIsDistracted } = await chrome.storage.local.get(['isDistracted']);
   if (await isUrlDistracting(url)) {
      showScreenBlocker(tabId);
      isDistracted = true;
   }
   if (prevIsDistracted !== isDistracted) {
      //Not distracted anymore
      if (isDistracted === false) {
         let stopTime = (new Date()).getTime();
         let { totalDistractedTime, distractedStartTime } = await chrome.storage.local.get(['totalDistractedTime', 'distractedStartTime']);
         let elapsed = stopTime - distractedStartTime;
         totalDistractedTime += elapsed;
         chrome.storage.local.set({ totalDistractedTime });
      }
      //Became distracted
      else {
         let distractedStartTime = (new Date()).getTime();
         chrome.storage.local.set({ distractedStartTime });
      }
   }
   chrome.storage.local.set({ isDistracted });
}



let isOnTask = async () => {
   let result = await chrome.storage.local.get(['isDistracted']);

   return !result.isDistracted;
}

function addTabListeners() {
   chrome.tabs.onActivated.addListener(function (activeInfo) {
      console.log("event listener");
      chrome.tabs.get(activeInfo.tabId, async function (tab) {
         let currentUrl = tab.url;
         let currentTabId = tab.id;
         await urlChangeHandler(currentUrl, currentTabId);
         console.log("urlChange");
      });
   });

   chrome.tabs.onUpdated.addListener(async function(tabId, change, tab) {
      if (tab.active && change.url) {
         console.log("event listener-update");
         let newUrl = change.url;
         await urlChangeHandler(newUrl, tabId);
         console.log("urlChange");
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
   let totalDistractedTime = 0;
   let isDistracted = false;

   //update text in html file
   chrome.storage.local.set({ startTime })
   chrome.storage.local.set({ TOTAL_TIME_MS });
   chrome.storage.local.set({ totalDistractedTime });
   chrome.storage.local.set({ isDistracted });
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





