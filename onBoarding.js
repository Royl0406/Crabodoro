document.addEventListener('DOMContentLoaded', function() {
  const input = document.getElementById('name');
  const btn = document.getElementById('btn-cont');

  btn.addEventListener('click', function() {
    chrome.tabs.create({
      url: './onBoarding.html',
    });
  });
});
