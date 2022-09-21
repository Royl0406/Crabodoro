var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//Tab Detector
//background.js
import { isUrlBlocked } from "./Common/storage-utilities.js";
import { SESSION_TIME_MINUTES, MAX_COIN } from "./Common/utilities.js";
chrome.runtime.onInstalled.addListener(function (e) {
    if (e.reason === chrome.runtime.OnInstalledReason.INSTALL) {
        chrome.storage.local.set({ isOnboardingDone: false });
        let blocked = [];
        chrome.storage.local.set({ blocked });
        chrome.tabs.create({
            url: "./dist/Settings/onBoarding.html"
        });
    }
});
function fetchBlockedList() {
    return __awaiter(this, void 0, void 0, function* () {
        let blockedList = yield chrome.storage.local.get(["blocked"]);
        return blockedList.blocked;
    });
}
function isUrlDistracting(url) {
    return __awaiter(this, void 0, void 0, function* () {
        let blockedList = yield fetchBlockedList();
        return isUrlBlocked(url, blockedList);
    });
}
function showScreenBlocker(tabId) {
    //executes script to change background
    chrome.scripting.executeScript({
        target: { tabId: tabId, allFrames: true },
        files: ['./dist/Screen-Blocker/warning-tab.js']
    });
}
function urlChangeHandler(url, tabId) {
    return __awaiter(this, void 0, void 0, function* () {
        let isDistracted = false;
        let { isDistracted: prevIsDistracted } = yield chrome.storage.local.get(['isDistracted']);
        if (yield isUrlDistracting(url)) {
            showScreenBlocker(tabId);
            isDistracted = true;
        }
        if (prevIsDistracted !== isDistracted) {
            //Not distracted anymore
            if (isDistracted === false) {
                let stopTime = (new Date()).getTime();
                let { totalDistractedTime, distractedStartTime } = yield chrome.storage.local.get(['totalDistractedTime', 'distractedStartTime']);
                let elapsed = stopTime - distractedStartTime;
                totalDistractedTime += elapsed;
                chrome.storage.local.set({ totalDistractedTime });
            }
            //Became distracted
            else {
                let distractedStartTime = (new Date()).getTime();
                chrome.storage.local.set({ distractedStartTime });
            }
        }
        chrome.storage.local.set({ isDistracted });
    });
}
let isOnTask = () => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield chrome.storage.local.get(['isDistracted']);
    return !result.isDistracted;
});
function addTabListeners() {
    chrome.tabs.onActivated.addListener(function (activeInfo) {
        console.log("event listener");
        chrome.tabs.get(activeInfo.tabId, function (tab) {
            return __awaiter(this, void 0, void 0, function* () {
                let currentUrl = tab.url;
                let currentTabId = tab.id;
                yield urlChangeHandler(currentUrl, currentTabId);
                console.log("urlChange");
            });
        });
    });
    chrome.tabs.onUpdated.addListener(function (tabId, change, tab) {
        return __awaiter(this, void 0, void 0, function* () {
            if (tab.active && change.url) {
                console.log("event listener-update");
                let newUrl = change.url;
                yield urlChangeHandler(newUrl, tabId);
                console.log("urlChange");
            }
        });
    });
}
let startGame = () => {
    addTabListeners();
    const MILLISECONDS_PER_SECOND = 1000;
    const SECONDS_PER_MINUTE = 60;
    const TOTAL_TIME_MS = SESSION_TIME_MINUTES * SECONDS_PER_MINUTE * MILLISECONDS_PER_SECOND;
    const COIN_RATE = MAX_COIN / TOTAL_TIME_MS;
    // Current time in milliseconds (from the epoch)
    let startTime = (new Date()).getTime();
    let totalDistractedTime = 0;
    let isDistracted = false;
    //update text in html file
    chrome.storage.local.set({ startTime });
    chrome.storage.local.set({ TOTAL_TIME_MS });
    chrome.storage.local.set({ totalDistractedTime });
    chrome.storage.local.set({ isDistracted });
};
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request === "start button clicked") {
        startGame();
    }
    //Message handler must call a response callback
    sendResponse();
});
//# sourceMappingURL=background.js.map