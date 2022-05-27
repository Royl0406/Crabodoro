window.onload = () => {
  var myButton = document.getElementById('card-unrated');

  myButton.onclick = () => {
    var location = "pomodoro.html"
    changePopupLocation(location);
    chrome.runtime.sendMessage("start button clicked");
  };
}

