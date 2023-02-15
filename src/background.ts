import * as Sentry from "@sentry/browser";

import {calcRemainingBreakTime, isUrlBlocked} from "./Common/storage-utilities";
import {SESSION_TIME_MINUTES, MAX_COIN, MINUTE_TO_MS} from "./Common/utilities";

Sentry.init({
  dsn: "https://7b5103208c5a4e8bb24932177645d34e@o1294946.ingest.sentry.io/4504602726957056",

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

chrome.runtime.onInstalled.addListener(function (e) {
   if(e.reason === chrome.runtime.OnInstalledReason.INSTALL) {
      chrome.storage.local.set({isOnboardingDone: false})
      
      let blockedList = [];
      chrome.storage.local.set({ blockedList })

      chrome.tabs.create({
         url: "onBoarding.html"
      })
   }
})

async function fetchBlockedList() {
   let result = await chrome.storage.local.get(["blockedList"]);
   return result.blockedList;
}

async function isUrlDistracting(url) {
   let blockedList = await fetchBlockedList();
   return isUrlBlocked(url, blockedList);
}

function showScreenBlocker(tabId) {
   //executes script to change background
   chrome.scripting.executeScript({
      target: { tabId: tabId, allFrames: true },
      files: ['warning-tab.js']
   });
}

function removeScreenBlocker(tabId) {
   chrome.scripting.executeScript({
      target: { tabId: tabId, allFrames: true },
      files: ['warning-tab-rmv.js']
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
         let { sessionDistractedTime, distractedStartTime } = await chrome.storage.local.get(['sessionDistractedTime', 'distractedStartTime']);
         let elapsed = stopTime - distractedStartTime;
         sessionDistractedTime += elapsed;
         chrome.storage.local.set({ sessionDistractedTime });
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

async function startGame() {
   addTabListeners();
   
   const sessionTimeMs = SESSION_TIME_MINUTES * MINUTE_TO_MS;

   let totCoinsInGame = 0;
   let totalDistractedTime = 0;
   let sessionsElapsed = 0;
   await startSession();

   await chrome.storage.local.set({ 
      sessionTimeMs,
      totCoinsInGame,
      totalDistractedTime,
      sessionsElapsed
   });
}

async function startSession() {
   let startTime = (new Date()).getTime();
   let sessionDistractedTime = 0;
   let isDistracted = false;

   await chrome.storage.local.set({
      startTime,
      sessionDistractedTime,
      isDistracted
   });
}

chrome.runtime.onMessage.addListener(
   async function (request, sender, sendResponse) {
      if (request === "start game") {
         await startGame();
      }
      else if (request === "start session") {
         await startSession();
      }
      else if (request === "end game") {
         endGame();
      }
      //Message handler must call a response callback
      sendResponse();
   }
);

function removeTabListeners() {
   chrome.tabs.onActivated.removeListener(onActivatedTabListener);
   chrome.tabs.onUpdated.removeListener(onUpdatedTabListener);
}

function endGame() {
   removeTabListeners();
}





