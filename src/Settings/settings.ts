import { DEFAULT_BLOCKEDLIST } from "../Common/constants.js";

document.addEventListener("DOMContentLoaded", function () {
    const btnDefault = document.getElementById("default-btn");
    const btnCustom = document.getElementById("custom-btn");
    const btnDone = document.getElementById("save");

    let urlInputElement = document.getElementById("url-input") as HTMLInputElement;
    let currentModeElement = document.getElementById("block-mode");
    let blockedListElement = document.getElementById("blocklist")

    btnDefault.addEventListener("click", function () {
        currentModeElement.innerHTML = "Default Blocklist";
        blockedListElement.style.display = "none";
        urlInputElement.style.display = "none";
    })

    btnCustom.addEventListener("click", function () {
        currentModeElement.innerHTML = "My Blocklist";
        blockedListElement.style.display = "block";
        urlInputElement.style.display = "block";
    })

    btnDone.addEventListener("click", async function () {
        if(await blockedListIsEmpty()) {
            await chrome.storage.local.set({blockedList: DEFAULT_BLOCKEDLIST});
        }
        alert("Blocked list saved! You may close this tab and open Crabodoro.");
    })

    async function blockedListIsEmpty() {
        let result = await chrome.storage.local.get(["blockedList"]);
        let blockedList = result.blockedList as Array<string>;
        return blockedList.length === 0;
    }
    
    function removeUrlFromStorage(listItem) {
        chrome.storage.local.get(["blockedList"], function (result) {
            let tempList = result.blockedList;
            let matchingIndex = tempList.findIndex((blockedUrl) => {
                return listItem.innerText.indexOf(blockedUrl);
            });
            tempList.splice(matchingIndex, 1);
            chrome.storage.local.set({ blockedList: tempList });
        })
        listItem.remove();
    }

    function updateBlocklistInStorage(urlInput) {
        chrome.storage.local.get(["blockedList"], function (result) {
            let tempList = result.blockedList;
            tempList.push(urlInput.value);
            chrome.storage.local.set({ blockedList: tempList });
        })
    }

    urlInputElement.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            if (isValidUrl(urlInputElement.value)) {
                let listItem = document.createElement("li");
                listItem.appendChild(document.createTextNode(urlInputElement.value + " [x]"));
                blockedListElement.appendChild(listItem);
                listItem.onclick = function () {
                    console.log(listItem.innerText);
                    removeUrlFromStorage(listItem);
                }
                updateBlocklistInStorage(urlInputElement);
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