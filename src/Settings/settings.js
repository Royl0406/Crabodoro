document.addEventListener("DOMContentLoaded", function () {
    const btnDefault = document.getElementById("default-btn");
    const btnCustom = document.getElementById("custom-btn");
    const btnDone = document.getElementById("save");

    let urlInput = document.getElementById("url-input");
    let currentMode = document.getElementById("block-mode");
    let blocklist = document.getElementById("blocklist")

    btnDefault.addEventListener("click", function () {
        currentMode.innerHTML = "Default Blocklist";
        blocklist.style.display = "none";
        urlInput.style.display = "none";
    })

    btnCustom.addEventListener("click", function () {
        currentMode.innerHTML = "My Blocklist";
        blocklist.style.display = "block";
        urlInput.style.display = "block";
    })

    btnDone.addEventListener("click", function () {
        alert("Blocked list saved! You may close this tab and open Crabodoro.");
    })

    function removeUrlFromStorage(listItem) {
        chrome.storage.local.get(["blocked"], function (result) {
            let tempList = result.blocked;
            let matchingIndex = tempList.findIndex((blockedUrl) => {
                return listItem.innerText.indexOf(blockedUrl);
            });
            tempList.splice(matchingIndex, 1);
            chrome.storage.local.set({ blocked: tempList });
        })
        listItem.remove();
    }

    function updateBlocklistInStorage(urlInput) {
        chrome.storage.local.get(["blocked"], function (result) {
            let tempList = result.blocked;
            tempList.push(urlInput.value);
            chrome.storage.local.set({ blocked: tempList });
        })
    }

    urlInput.addEventListener("keypress", function () {
        if (event.key === "Enter") {
            if (isValidUrl(urlInput.value)) {
                let listItem = document.createElement("li");
                listItem.appendChild(document.createTextNode(urlInput.value + " [x]"));
                blocklist.appendChild(listItem);
                listItem.onclick = function () {
                    console.log(listItem.innerText);
                    removeUrlFromStorage(listItem);
                }
                updateBlocklistInStorage(urlInput);
            }
            else {
                alert("Please enter a valid url");
            }
        }
    })

    const isValidUrl = (url) => {
        try {
            new URL(url);
        } catch (e) {
            console.error(e);
            return false;
        }
        return true;
    };
})