import { navToShop, navToMainMenu } from '../Common/utilities.js'
import {fetchLevel, fetchName, fetchXp} from '../Common/storage-utilities.js';
import { calcLevel, calcLevelUpXp, calcTotalXpForLevel } from '../Stats-Screen/xp-utilities.js';

document.addEventListener("DOMContentLoaded", async () => {
    const BTN_MAIN = document.getElementById("main-menu");
    const BTN_SHOP = document.getElementById("shop");
    const BTN_FEED = document.getElementById("feed-btn");
    const LEVEL = document.getElementById("level");
    const NAME = document.getElementById("crab-name");
    const XP_BAR = document.getElementsByClassName("xp-actual")[0] as HTMLElement;



    BTN_MAIN.addEventListener("click", () => {
        navToMainMenu();
    })
    BTN_SHOP.addEventListener("click", () => {
        navToShop();
    })

    BTN_FEED.addEventListener("click", () => {
        alert("fed");
    })
    let totalXp = await fetchXp();
    let currentLevel = await calcLevel(totalXp);
    let prevLevel = currentLevel - 1;
    let xpToNextLevel = calcLevelUpXp(currentLevel);
    let totalXpForPrevLevel = await calcTotalXpForLevel(prevLevel);
    let xpOnCurrentLevel = totalXp - totalXpForPrevLevel;
    let xpBarPercentage = xpOnCurrentLevel / xpToNextLevel * 100;

    NAME.innerHTML = (await fetchName()).toString();
    LEVEL.innerHTML += currentLevel;

    console.log("tot xp: "+ totalXp);
    console.log("totxpforCurrentLevel: " + totalXpForPrevLevel);
    console.log(xpOnCurrentLevel);
    
    console.log(xpBarPercentage);

    XP_BAR.style.width = xpBarPercentage + "%";

})
