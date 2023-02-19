import * as Sentry from "@sentry/browser";

import { navToShop, navToMainMenu } from '../Common/utilities'
import { decrementFoodCount, fetchFoodCount, fetchName, fetchXp } from '../Common/storage-utilities';
import { calcLevel, calcLevelUpXp, calcTotalXpForLevel } from '../Stats-Screen/xp-utilities';

Sentry.init({
    dsn: "https://7b5103208c5a4e8bb24932177645d34e@o1294946.ingest.sentry.io/4504602726957056",
  
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });  


document.addEventListener("DOMContentLoaded", async () => {
    const BTN_MAIN = document.getElementById("main-menu");
    const BTN_SHOP = document.getElementById("shop");
    const BTN_FEED = document.getElementById("feed-btn");
    const LEVEL = document.getElementById("level");
    const NAME = document.getElementById("crab-name");
    const XP_BAR = document.getElementsByClassName("xp-actual")[0] as HTMLElement;
    const FOOD_DISPLAY = document.getElementById("food-display");



    BTN_MAIN.addEventListener("click", () => {
        navToMainMenu();
    })
    BTN_SHOP.addEventListener("click", () => {
        navToShop();
    })

    BTN_FEED.addEventListener("click", async () => {
        if(await fetchFoodCount() === 0) {
            alert("You don't have enough pizza!");
            return;
        }
        alert("fed");
        FOOD_DISPLAY.innerHTML = (await decrementFoodCount()).toString();
    })
    let totalXp = await fetchXp();
    let currentLevel = await calcLevel(totalXp);
    let prevLevel = currentLevel - 1;
    let xpToNextLevel = calcLevelUpXp(currentLevel);
    let totalXpForPrevLevel = await calcTotalXpForLevel(prevLevel);
    let xpOnCurrentLevel = totalXp - totalXpForPrevLevel;
    let xpBarPercentage = xpOnCurrentLevel / xpToNextLevel * 100;
    let totalFood = await fetchFoodCount();

    NAME.innerHTML = (await fetchName()).toString();
    LEVEL.innerHTML += currentLevel;
    FOOD_DISPLAY.innerHTML = totalFood.toString();

    console.log("tot xp: "+ totalXp);
    console.log("totxpforCurrentLevel: " + totalXpForPrevLevel);
    console.log(xpOnCurrentLevel);
    
    console.log(xpBarPercentage);

    XP_BAR.style.width = xpBarPercentage + "%";

})
