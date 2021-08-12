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
       }
   });
});

chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
   if (tab.active && change.url) {
       console.log("you are here: "+change.url);     
       if(tab_checker(y) == true){
          console.log("Go back to work");
       }      
   }
});



