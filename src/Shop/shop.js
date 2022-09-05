import { navToCrabSpace } from '../Common/utilities.js'

document.addEventListener("DOMContentLoaded", () => {
    const BTN_CRABSPACE = document.getElementById("shop-crabSpace");

    BTN_CRABSPACE.addEventListener("click", () => {
        navToCrabSpace();
    })

})