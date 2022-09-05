import { navToShop, navToMainMenu } from '../Common/utilities.js'

document.addEventListener("DOMContentLoaded", () => {
    const BTN_MAIN = document.getElementById("main-menu");
    const BTN_SHOP = document.getElementById("shop");

    BTN_MAIN.addEventListener("click", () => {
        navToMainMenu();
    })
    BTN_SHOP.addEventListener("click", () => {
        navToShop();
    })
})