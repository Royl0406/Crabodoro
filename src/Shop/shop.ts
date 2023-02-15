import { navToCrabSpace } from '../Common/utilities'
import { fetchBankCoins, addToBank, fetchFoodCount, incrementFoodCount } from '../Common/storage-utilities'
import pizzaImg from "../../Assets/pizza.png";

interface ShopItem {
    name: string;
    cost: number;
    img: string;
}

let inventory: ShopItem[] = [
    { name: "Pizza", cost: 300, img: pizzaImg }
];

document.addEventListener("DOMContentLoaded", async () => {
    const SHOP_ITEM_HEAD = document.getElementById("shop-item-head");

    const COIN_DIV = document.getElementById("coin-display");
    const FOOD_DIV = document.getElementById("food-display");

    let coinCount = await fetchBankCoins();
    let foodCount = await fetchFoodCount();
    COIN_DIV.textContent = "Coin count: " + coinCount;
    FOOD_DIV.textContent = "Food count: " + foodCount;

    for (const item of inventory) {
        const CONTAINER = document.createElement("div");
        const IMG = document.createElement("input");
        const LABEL = document.createElement("div");



        CONTAINER.className = "column center";

        IMG.type = "image";
        IMG.id = item.name;
        IMG.src = item.img;

        IMG.addEventListener("click", async () => {
            if (coinCount < item.cost) {
                alert("You don't have enough coins");
                return;
            }
            alert("-$" + item.cost + "\n Item purchased: " + item.name);
            coinCount = await addToBank(-item.cost);
            foodCount = await incrementFoodCount();

            COIN_DIV.textContent = "Coin count: " + coinCount;
            FOOD_DIV.textContent = "Food count: " + foodCount;
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