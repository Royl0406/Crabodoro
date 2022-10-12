import { navToCrabSpace } from '../Common/utilities.js'

interface ShopItem {
    name: string;
    cost: number;
    img: string;
}

let inventory: ShopItem[] = [{name: "Pizza", cost: 300, img: "../../Assets/pizza.png"}];

document.addEventListener("DOMContentLoaded", () => {
    const SHOP_ITEM_HEAD = document.getElementById("shop-item-head");
    for(const item of inventory) {
        const CONTAINER = document.createElement("div");
        const IMG = document.createElement("input");
        const LABEL = document.createElement("div");

        CONTAINER.className = "column center";

        IMG.type = "image";
        IMG.id = item.name;
        IMG.src = item.img;

        IMG.addEventListener("click", () => {
            alert("-$" + item.cost + "\n Item purchased: " + item.name);
        })

        LABEL.textContent = item.name + " price: " + item.cost;

        CONTAINER.appendChild(IMG);
        CONTAINER.appendChild(LABEL);
        SHOP_ITEM_HEAD.appendChild(CONTAINER);
    }

    const BTN_CRABSPACE = document.getElementById("shop-crabSpace");

    BTN_CRABSPACE.addEventListener("click", () => {
        navToCrabSpace();
    })

})