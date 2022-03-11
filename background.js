//Tab Detector
//background.js
function isUrlDistracting(url) {
   if (url === "https://www.youtube.com/" || url === "https://www.instagram.com/"){
      return true;   
   }
   return false;
}

function showScreenBlocker() {
   //executes script to change background
   chrome.scripting.executeScript({
      target: { tabId: tab.id, allFrames: true},
      files: ['warning-tab.js']
    });
}

function showBlockerIfDistracted(url) {
   if (isUrlDistracting(url)) {
      showScreenBlocker();
   }
}

chrome.storage.local.get('enabled', data => {
   if (!data.enabled) {
      console.log("Extension off");
      return;
   }
   chrome.tabs.onActivated.addListener( function(activeInfo) {
      chrome.tabs.get(activeInfo.tabId, function(tab) {
         let currentUrl = tab.url;
         showBlockerIfDistracted(currentUrl);
      });
   });
   
   chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
      if (tab.active && change.url) {  
         let newUrl = change.url;  
         showBlockerIfDistracted(newUrl);
      }
   });
});




