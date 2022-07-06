window.onload = () => {
  const myButton = document.getElementById('card-unrated');

  myButton.onclick = () => {
    const location = 'pomodoro.html';
    changePopupLocation(location);
    chrome.runtime.sendMessage('start button clicked');
  };
};

