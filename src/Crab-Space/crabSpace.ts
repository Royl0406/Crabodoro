import { navToShop, navToMainMenu } from '../Common/utilities.js'
import {fetchLevel} from '../Common/storage-utilities.js';

document.addEventListener("DOMContentLoaded", () => {
    const BTN_MAIN = document.getElementById("main-menu");
    const BTN_SHOP = document.getElementById("shop");
    const BTN_FEED = document.getElementById("feed-btn");

    BTN_MAIN.addEventListener("click", () => {
        navToMainMenu();
    })
    BTN_SHOP.addEventListener("click", () => {
        navToShop();
    })

    BTN_FEED.addEventListener("click", () => {
        alert("fed");
    })

})
