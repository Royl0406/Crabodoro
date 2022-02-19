//button.js
/*console.log("button.js loaded");
document.getElementById("toggle").addEventListener("click", pressed);

chrome.storage.local.set({'status': true}, function() {
  console.log('Value is set to ' + value);
});

function pressed() {
  chrome.storage.local.get(['status'], function(result) {
    console.log('Value currently is ' + result.status);
    
      chrome.storage.local.set({'status': !result.status});
  });
  //console.log("button pressed");
}*/
window.onload = () => {
  var enabled = false; //disabled by default
  var myButton = document.getElementById('card-unrated');

  chrome.storage.local.get('enabled', data => {
    enabled = !!data.enabled;
  });

  myButton.onclick = () => {
    var location = "warning-tab.html"
    enabled = !enabled;
    console.log("button pressed");
    chrome.storage.local.set({enabled:enabled});
    changePopupLocation(location);
  };
}

