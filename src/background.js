//Tab Detector
//background.js
import {calcRemainingBreakTime, isUrlBlocked} from "./Common/storage-utilities.js";
import {SESSION_TIME_MINUTES, MAX_COIN, MINUTE_TO_MS} from "./Common/utilities.js";


chrome.runtime.onInstalled.addListener(function (e) {
   if(e.reason === chrome.runtime.OnInstalledReason.INSTALL) {
      chrome.storage.local.set({isOnboardingDone: false})
      
      let blocked = [];
      chrome.storage.local.set({ blocked })

      chrome.tabs.create({
         url: "./dist/Settings/onBoarding.html"
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
      files: ['./dist/Screen-Blocker/warning-tab.js']
   });
}

function removeScreenBlocker(tabId) {
   chrome.scripting.executeScript({
      target: { tabId: tabId, allFrames: true },
      files: ['./dist/Screen-Blocker/warning-tab-rmv.js']
   })

   //chrome.tabs.reload(tabId);
}

async function urlChangeHandler(url, tabId) {
   let isDistracted = false;
   let remainingBreakTimeMs = await calcRemainingBreakTime();
   let { isDistracted: prevIsDistracted } = await chrome.storage.local.get(['isDistracted']);
   if (await isUrlDistracting(url) && remainingBreakTimeMs <= 0) {
      showScreenBlocker(tabId);
      isDistracted = true;
   }
   if (remainingBreakTimeMs > 0 && await isUrlDistracting(url)) {
      removeScreenBlocker(tabId);
      isDistracted = false;
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

async function onActivatedTabListener(activeInfo) {
   chrome.tabs.get(activeInfo.tabId, async function (tab) {
      let currentUrl = tab.url;
      let currentTabId = tab.id;
      await urlChangeHandler(currentUrl, currentTabId);
   });
}

async function onUpdatedTabListener(tabId, change, tab) {
   if (tab.active && change.url) {
      let newUrl = change.url;
      await urlChangeHandler(newUrl, tabId);
   }
}

function addTabListeners() {
   chrome.tabs.onActivated.addListener(onActivatedTabListener);

   chrome.tabs.onUpdated.addListener(onUpdatedTabListener);
}

let startGame = async () => {
   addTabListeners();

   const TOTAL_TIME_MS = SESSION_TIME_MINUTES * MINUTE_TO_MS;
   const COIN_RATE = MAX_COIN / TOTAL_TIME_MS;

   // Current time in milliseconds (from the epoch)
   let startTime = (new Date()).getTime();
   let totalDistractedTime = 0;
   let isDistracted = false;

   //update text in html file
   await chrome.storage.local.set({ startTime, TOTAL_TIME_MS, totalDistractedTime, isDistracted });
}

chrome.runtime.onMessage.addListener(
   async function (request, sender, sendResponse) {
      if (request === "start button clicked") {
         await startGame();
      }
      //Message handler must call a response callback
      sendResponse();
   }
);





