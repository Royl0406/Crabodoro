document.addEventListener("DOMContentLoaded", function () {
  const input = document.querySelector("#name");
  const btn = document.querySelector("#btn-cont");

  btn.addEventListener("click", function () {
    const crab = {
      name: input,
      level: 1,
      xp: 0,
    };

    chrome.storage.local.set({ crab });

    window.location.href = "./settings.html";
  });
});
