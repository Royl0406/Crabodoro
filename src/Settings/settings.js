document.addEventListener("DOMContentLoaded", function () {
  const btnDefault = document.querySelector("#default-btn");
  const btnCustom = document.querySelector("#custom-btn");
  const btnDone = document.querySelector("#save");

  const urlInput = document.querySelector("#url-input");
  const currentMode = document.querySelector("#block-mode");
  const blocklist = document.querySelector("#blocklist");

  btnDefault.addEventListener("click", function () {
    currentMode.innerHTML = "Default Blocklist";
    blocklist.style.display = "none";
    urlInput.style.display = "none";
  });

  btnCustom.addEventListener("click", function () {
    currentMode.innerHTML = "My Blocklist";
    blocklist.style.display = "block";
    urlInput.style.display = "block";
  });

  btnDone.addEventListener("click", function () {
    alert("Blocked list saved! You may close this tab and open Crabodoro.");
  });

  function removeUrlFromStorage(listItem) {
    chrome.storage.local.get(["blocked"], function (result) {
      const tempList = result.blocked;
      const matchingIndex = tempList.findIndex((blockedUrl) => {
        return listItem.innerText.indexOf(blockedUrl);
      });
      tempList.splice(matchingIndex, 1);
      chrome.storage.local.set({ blocked: tempList });
    });
    listItem.remove();
  }

  function updateBlocklistInStorage(urlInput) {
    chrome.storage.local.get(["blocked"], function (result) {
      const tempList = result.blocked;
      tempList.push(urlInput.value);
      chrome.storage.local.set({ blocked: tempList });
    });
  }

  urlInput.addEventListener("keypress", function () {
    if (event.key === "Enter") {
      if (isValidUrl(urlInput.value)) {
        const listItem = document.createElement("li");
        listItem.append(document.createTextNode(urlInput.value + " [x]"));
        blocklist.append(listItem);
        listItem.addEventListener("click", function () {
          console.log(listItem.innerText);
          removeUrlFromStorage(listItem);
        });
        updateBlocklistInStorage(urlInput);
      } else {
        alert("Please enter a valid url");
      }
    }
  });

  const isValidUrl = (url) => {
    try {
      new URL(url);
    } catch (error) {
      console.error(error);
      return false;
    }
    return true;
  };
});
