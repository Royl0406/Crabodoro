//Tab Detector
//background.js
function tab_checker (y) {
   if (y == "https://www.youtube.com/" || y == "https://www.instagram.com/"){
      return true;   
   }
   return false;
}

chrome.tabs.onActivated.addListener( function(activeInfo){
   chrome.tabs.get(activeInfo.tabId, function(tab){
       y = tab.url;
       console.log("you are here: "+y);
       if (tab_checker(y) == true){
          console.log("Go back to work");
          //debugging
          console.log(activeInfo);
          console.log(tab);

          //Method 2
          /*fetch(chrome.runtime.getURL('warning-tab.html')).then(r => r.text()).then(html => {
            document.body.insertAdjacentHTML('beforeend', html);
            // not using innerHTML as it would break js event listeners of the page
          });*/

          //executs script to change background
          chrome.scripting.executeScript({
            target: { tabId: tab.id, allFrames: true},
            //content-script deleted
            files: ['warning-tab.js']
          });
          console.log("html loaded successfully");
       }
   });
});

chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
   if (tab.active && change.url) {
       console.log("you are here: "+change.url);     
       if(tab_checker(change.url) == true){
          console.log("Go back to work no.2");

          /*fetch(chrome.runtime.getURL('warning-tab.html')).then(r => r.text()).then(html => {
            document.body.insertAdjacentHTML('beforeend', html);
            // not using innerHTML as it would break js event listeners of the page
          });*/

          //executes script to change background
          chrome.scripting.executeScript({
            target: { tabId: tabId, allFrames: true},
            //content script deleted
            files: ['warning-tab.js']
          });
          console.log("html loaded successfully");
       }      
   }
});



