// Tab Detector
// background.js
chrome.runtime.onInstalled.addListener(function(e) {
  if (e.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    chrome.storage.local.set({isOnboardingDone: false});

    chrome.tabs.create({
      url: './onBoarding.html',
    });
  }
});

function isUrlDistracting(url) {
  if (url === 'https://www.youtube.com/' || url === 'https://www.instagram.com/') {
    return true;
  }
  return false;
}

function showScreenBlocker(tabId) {
  // executes script to change background
  chrome.scripting.executeScript({
    target: {tabId: tabId, allFrames: true},
    files: ['warning-tab.js'],
  });
}

async function urlChangeHandler(url, tabId) {
  let isDistracted = false;
  const {isDistracted: prevIsDistracted} = await chrome.storage.local.get(['isDistracted']);
  if (isUrlDistracting(url)) {
    showScreenBlocker(tabId);
    isDistracted = true;
  }
  if (prevIsDistracted !== isDistracted) {
    // Not distracted anymore
    if (isDistracted === false) {
      const stopTime = (new Date()).getTime();
      let {totalDistractedTime, distractedStartTime} = await chrome.storage.local.get(['totalDistractedTime', 'distractedStartTime']);
      const elapsed = stopTime - distractedStartTime;
      totalDistractedTime += elapsed;
      chrome.storage.local.set({totalDistractedTime});
    }
    // Became distracted
    else {
      distractedStartTime = (new Date()).getTime();
      chrome.storage.local.set({distractedStartTime});
    }
  }
  chrome.storage.local.set({isDistracted});
}


const isOnTask = async () => {
  const result = await chrome.storage.local.get(['isDistracted']);

  return !result.isDistracted;
};

function addTabListeners() {
  chrome.tabs.onActivated.addListener(function(activeInfo) {
    chrome.tabs.get(activeInfo.tabId, async function(tab) {
      const currentUrl = tab.url;
      const currentTabId = tab.id;
      await urlChangeHandler(currentUrl, currentTabId);
    });
  });

  chrome.tabs.onUpdated.addListener(async function(tabId, change, tab) {
    if (tab.active && change.url) {
      const newUrl = change.url;
      await urlChangeHandler(newUrl, tabId);
    }
  });
}

const startGame = () => {
  addTabListeners();

  const MILLISECONDS_PER_SECOND = 1000;
  const SECONDS_PER_MINUTE = 60;
  const SESSION_TIME_MINUTES = 40;
  const MAX_COIN = 200;
  const TOTAL_TIME_MS = SESSION_TIME_MINUTES * SECONDS_PER_MINUTE * MILLISECONDS_PER_SECOND;
  const COIN_RATE = MAX_COIN / TOTAL_TIME_MS;

  // Current time in milliseconds (from the epoch)
  const startTime = (new Date()).getTime();
  const totalDistractedTime = 0;
  const isDistracted = false;

  // update text in html file
  chrome.storage.local.set({startTime});
  chrome.storage.local.set({TOTAL_TIME_MS});
  chrome.storage.local.set({totalDistractedTime});
  chrome.storage.local.set({isDistracted});
};

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request === 'start button clicked') {
        startGame();
      }
      // Message handler must call a response callback
      sendResponse();
    },
);


